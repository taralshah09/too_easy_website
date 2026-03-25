import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import nodemailer from "nodemailer";
import fs from "fs";

// ─── Disable Vercel's default body parser so formidable can handle multipart ───
export const config = {
    api: {
        bodyParser: false,
    },
};

// ─── Cloudinary config ───────────────────────────────────────────────────────
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Parse multipart FormData from the incoming request */
const parseForm = (req) =>
    new Promise((resolve, reject) => {
        const form = formidable({ multiples: true, maxFileSize: 4.5 * 1024 * 1024 });
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });

/** Upload a single file to Cloudinary and return its public URL */
const uploadToCloudinary = (filePath, originalName) =>
    new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            filePath,
            {
                folder: "onboarding-forms",
                public_id: `${Date.now()}-${originalName.replace(/\s+/g, "_")}`,
                resource_type: "auto", // handles images, PDFs, zips, etc.
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );
    });

/** Convert camelCase key → "Camel Case" readable label */
const toLabel = (key) =>
    key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (s) => s.toUpperCase())
        .trim();

/** Build a clean HTML email body */
const buildEmailHTML = (fields, fileLinks) => {
    // Rows for every text/checkbox/radio field
    const fieldRows = Object.entries(fields)
        .map(([key, value]) => {
            const val = Array.isArray(value) ? value.join(", ") : value;
            if (!val || val.trim() === "") return ""; // skip empty fields
            return `
            <tr>
                <td style="padding:9px 14px;background:#f6f7f9;font-weight:600;width:38%;
                           border:1px solid #e0e0e0;color:#333;vertical-align:top;">
                    ${toLabel(key)}
                </td>
                <td style="padding:9px 14px;border:1px solid #e0e0e0;color:#555;
                           word-break:break-word;">
                    ${val}
                </td>
            </tr>`;
        })
        .join("");

    // Rows for uploaded files (Cloudinary URLs)
    const fileRows = fileLinks
        .map(
            ({ label, url }) => `
            <tr>
                <td style="padding:9px 14px;background:#f6f7f9;font-weight:600;width:38%;
                           border:1px solid #e0e0e0;color:#333;">
                    ${label}
                </td>
                <td style="padding:9px 14px;border:1px solid #e0e0e0;">
                    <a href="${url}" target="_blank"
                       style="color:#4f6ef7;word-break:break-all;">${url}</a>
                </td>
            </tr>`
        )
        .join("");

    return `
    <div style="font-family:Arial,sans-serif;max-width:820px;margin:0 auto;color:#333;">

        <!-- Header -->
        <div style="background:#1a1a2e;color:#fff;padding:22px 28px;border-radius:8px 8px 0 0;">
            <h2 style="margin:0;font-size:20px;">
                📋 New Onboarding Submission
            </h2>
            <p style="margin:6px 0 0;opacity:.75;font-size:14px;">
                ${fields.businessName || "Unknown Business"} &nbsp;·&nbsp;
                ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
            </p>
        </div>

        <!-- Form Fields -->
        <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            <thead>
                <tr>
                    <th colspan="2"
                        style="background:#16213e;color:#fff;padding:11px 14px;
                               text-align:left;font-size:13px;letter-spacing:.5px;">
                        FORM DETAILS
                    </th>
                </tr>
            </thead>
            <tbody>${fieldRows}</tbody>
        </table>

        <!-- Uploaded Files (only shown when files exist) -->
        ${fileLinks.length > 0
            ? `
        <table style="width:100%;border-collapse:collapse;margin-top:20px;">
            <thead>
                <tr>
                    <th colspan="2"
                        style="background:#16213e;color:#fff;padding:11px 14px;
                               text-align:left;font-size:13px;letter-spacing:.5px;">
                        UPLOADED FILES (via Cloudinary)
                    </th>
                </tr>
            </thead>
            <tbody>${fileRows}</tbody>
        </table>`
            : ""
        }

        <!-- Footer -->
        <p style="font-size:12px;color:#aaa;margin-top:24px;padding-bottom:10px;">
            Sent automatically from your Project Onboarding Form · Vercel Serverless
        </p>
    </div>`;
};

// ─── Main Handler ─────────────────────────────────────────────────────────────
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // 1. Parse form data (fields + files)
        const { fields, files } = await parseForm(req);

        // formidable v3 wraps every value in an array — flatten them
        const flatFields = {};
        for (const [key, val] of Object.entries(fields)) {
            flatFields[key] = Array.isArray(val) ? val[0] : val;
        }

        // 2. Upload files to Cloudinary
        const fileKeys = [
            { key: "logoUpload", label: "Logo Upload" },
            { key: "contentUpload", label: "Content Upload" },
            { key: "imageUpload", label: "Image Upload" },
        ];

        const fileLinks = [];

        for (const { key, label } of fileKeys) {
            const file = files[key];
            if (!file) continue;

            // formidable v3 also wraps files in arrays
            const fileObj = Array.isArray(file) ? file[0] : file;
            if (!fileObj?.filepath) continue;

            try {
                const url = await uploadToCloudinary(
                    fileObj.filepath,
                    fileObj.originalFilename || key
                );
                fileLinks.push({ label, url });
            } catch (uploadErr) {
                console.error(`Cloudinary upload failed for ${key}:`, uploadErr);
                // Non-fatal — continue without blocking the email
            } finally {
                // Always clean up Vercel's temp file
                try { fs.unlinkSync(fileObj.filepath); } catch (_) { }
            }
        }

        // 3. Send email via Nodemailer + Gmail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"Project Onboarding" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            replyTo: flatFields.email || "",
            subject: `New Onboarding: ${flatFields.businessName || "Unknown"} — ${flatFields.firstName || ""} ${flatFields.lastName || ""}`,
            html: buildEmailHTML(flatFields, fileLinks),
        });

        return res.status(200).json({ success: true });

    } catch (err) {
        console.error("submit-form error:", err);
        return res.status(500).json({ error: "Submission failed. Please try again." });
    }
}