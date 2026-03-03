import { useState } from "react";
import recentWorkData from "../data/recentwork.json";

const PAGE_SIZE = 6;

export default function RecentWork() {
    const [visible, setVisible] = useState(PAGE_SIZE);

    const showLoadMore = visible < recentWorkData.length;

    return (
        <section className="recent-work">
            <div className="recent-work-inner">
                <div className="recent-work-upper">
                    <h2 className="recent-work-heading">Our Recent Work</h2>
                    <p className="recent-work-body">
                        Check out some of the beautiful and effective websites we've built for
                        small businesses like yours.
                    </p>
                </div>

                <div className="recent-work-grid">
                    {recentWorkData.slice(0, visible).map((work, index) => (
                        <a
                            href={work.link}
                            key={index}
                            className="recent-work-card"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={work.img}
                                alt={`Recent work ${index + 1}`}
                                className="recent-work-img"
                            />
                        </a>
                    ))}
                </div>

                {showLoadMore && (
                    <div className="recent-work-load-more">
                        <button
                            className="recent-work-btn"
                            onClick={() => setVisible((v) => v + PAGE_SIZE)}
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}