import whyChooseData from "../data/whychoose.json";

export default function WhyChoose() {
    return (
        <section className="why-choose">
            <div className="why-choose-inner">
                <div className="why-choose-left">
                    <h2 className="why-choose-heading">
                        Why Choose Too<span>Easy</span>Websites?
                    </h2>
                    <p className="why-choose-body">
                        We make getting a website for your small business easy and affordable. Here's why you should choose us:
                    </p>
                </div>

                <div className="why-choose-right">
                    <div className="why-choose-grid">
                        {whyChooseData.map((item, index) => (
                            <div key={index} className="why-choose-card">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="why-choose-card-icon"
                                />
                                <div className="why-choose-card-text">
                                    <h3 className="why-choose-card-title">{item.title}</h3>
                                    <p className="why-choose-card-desc">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}