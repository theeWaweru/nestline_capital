"use client";

import Image from "next/image";
import Link from "next/link";
import SplitText from "./animations/split_text";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

export default function Home() {
  return (
    <>
      <div className="page-wrapper">
        <main className="main-wrapper">
          <div className="home-hero">
            <div
              data-w-id="ae6a4436-ce25-7105-7725-27e5a102dde1"
              className="basic-hero-block"
            >
              <div className="hero-left">
                <div
                  id="w-node-f212baf6-9f92-2888-4bc5-4830d50baf4c-90e1fcb7"
                  data-w-id="f212baf6-9f92-2888-4bc5-4830d50baf4c"
                  className="basic-hero-side"
                >
                  <div className="image-overlay hidden" />
                  <Image
                    fill
                    src="/images/Malindi-5.webp"
                    loading="lazy"
                    alt="WeVenue reception area"
                    className="image-fill"
                  />
                </div>
                <div
                  id="w-node-dc927714-fb88-dfb9-0c54-5eab828cb691-90e1fcb7"
                  className="strip-loop"
                >
                  <div className="home-hero-strip">
                    <div className="rotate-text">
                      <div className="text-size-xsmall">Karibu Malindi</div>
                      <div className="text-size-xsmall">
                        Explore Opportunities
                      </div>
                      <div className="text-size-xsmall">Nestline Capital</div>
                      <div className="text-size-xsmall">Karibu Malindi</div>
                      <div className="text-size-xsmall">
                        Explore Opportunities
                      </div>
                    </div>
                    <div className="rotate-text">
                      <div className="text-size-xsmall">Karibu Malindi</div>
                      <div className="text-size-xsmall">
                        Explore Opportunities
                      </div>
                      <div className="text-size-xsmall">Nestline Capital</div>
                      <div className="text-size-xsmall">Karibu Malindi</div>
                      <div className="text-size-xsmall">
                        Explore Opportunities
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="home-hero-right">
                <div
                  id="w-node-dddb9ec2-1db6-9004-f11c-25c2a7113d5f-90e1fcb7"
                  data-w-id="dddb9ec2-1db6-9004-f11c-25c2a7113d5f"
                  className="padding-vertical"
                >
                  <div className="home-hero-title">
                    <div className="padding-horizontal padding-medium">
                      <div className="home-hero-heading">
                        <SplitText
                          text="Karibu"
                          className="heading-style-h1 text-align-center"
                          delay={100}
                          duration={0.6}
                          ease="power3.out"
                          splitType="chars"
                          from={{ opacity: 0, y: 40 }}
                          to={{ opacity: 1, y: 0 }}
                          threshold={0.1}
                          rootMargin="-100px"
                          textAlign="center"
                          onLetterAnimationComplete={handleAnimationComplete}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="home-hero-title">
                    <div className="padding-horizontal padding-medium">
                      <div className="home-hero-heading">
                        <SplitText
                          text="Malindi"
                          className="heading-style-h1 text-align-center"
                          delay={100}
                          duration={0.6}
                          ease="power3.out"
                          splitType="chars"
                          from={{ opacity: 0, y: 40 }}
                          to={{ opacity: 1, y: 0 }}
                          threshold={0.1}
                          rootMargin="-100px"
                          textAlign="center"
                          onLetterAnimationComplete={handleAnimationComplete}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="w-node-_6a1b0120-717d-dfe7-0e5c-ae00bd9e6fda-90e1fcb7"
                  className="padding-horizontal padding-large"
                >
                  <div
                    data-w-id="dba47f68-804b-f26f-a7b0-a71a7de096bb"
                    className="home-hero-image"
                  >
                    <div className="home-hero-right-img">
                      <Image
                        fill
                        src="/images/coastline_2.webp"
                        loading="lazy"
                        sizes="100vw"
                        alt="Napa Valley fields"
                        className="image-fill"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-intro">
            <div>
              <div className="padding-top padding-xhuge">
                <div className="padding-bottom padding-xlarge">
                  <div className="padding-horizontal padding-medium">
                    <div className="venue-story-grid">
                      <div
                        id="w-node-_6dd0fe54-c11d-64c1-7602-29296a385384-90e1fcb7"
                        className="intro-block"
                      >
                        <div className="margin-bottom margin-medium">
                          <p className="text-size-large text-align-center">
                            Our coastal properties in Malindi offer world-class
                            appreciation potential and a unique gateway to
                            Kenya&apos;s growth story.
                          </p>
                        </div>
                        <a
                          href="contact.html"
                          className="button is-icon w-inline-block"
                        >
                          <div className="clip">
                            <div className="button-text">
                              <div className="text-size-tiny text-color-black">
                                Schedule a Consultation
                              </div>
                            </div>
                            <div className="button-text button-text-bottom">
                              <div className="text-size-tiny text-color-black">
                                Schedule a Consultation
                              </div>
                            </div>
                          </div>
                          <div className="clip">
                            <div className="button-icon">
                              <Image
                                fill
                                src="/images/Right-arrow-slant---dark.svg"
                                loading="lazy"
                                alt=""
                                className="icon-1x1-small"
                              />
                            </div>
                            <div className="button-icon button-icon-bottom">
                              <Image
                                fill
                                src="/images/Right-arrow-slant---dark.svg"
                                loading="lazy"
                                alt=""
                                className="icon-1x1-small"
                              />
                            </div>
                          </div>
                        </a>
                      </div>
                      <div
                        id="w-node-_06b0ead4-5c23-27e0-8e29-0ecc066ab1be-90e1fcb7"
                        data-w-id="06b0ead4-5c23-27e0-8e29-0ecc066ab1be"
                        className="slow-paralax"
                      >
                        <div
                          id="w-node-_635b4282-fdcf-8eb8-dff2-21e3acd1f851-90e1fcb7"
                          className="venue-story-image"
                        >
                          <div className="venue-story-item right-story-item">
                            <div className="image-overlay hidden" />
                            <Image
                              fill
                              src="/images/coastline_1.webp"
                              loading="lazy"
                              sizes="100vw"
                              alt="Inside seating area"
                              className="image-fill"
                            />
                          </div>
                        </div>
                      </div>
                      <div
                        id="w-node-c4371321-1004-1fc8-fcd5-b018de664afb-90e1fcb7"
                        data-w-id="c4371321-1004-1fc8-fcd5-b018de664afb"
                        className="fast-paralax"
                      >
                        <div
                          id="w-node-e11503ee-684a-08c7-5ee0-c796d4a9d915-90e1fcb7"
                          className="venue-story-image"
                        >
                          <div className="venue-story-item">
                            <div className="image-overlay hidden" />
                            <Image
                              fill
                              src="/images/beachline_1.webp"
                              loading="lazy"
                              sizes="100vw"
                              alt="Outdoor seating area"
                              className="image-fill"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="basic-footer-action">
            <div
              data-w-id="9ccb51d1-2ac6-575b-e9f3-a2608be981ce"
              className="featured-block"
            >
              <div className="featured-background">
                <Image
                  fill
                  src="/images/horizon_1.webp"
                  loading="lazy"
                  sizes="100vw"
                  alt="Wine country mountain view"
                  className="image-fill"
                />
                <div className="image-overlay hidden" />
              </div>
              <div
                id="w-node-_6230d6ec-9599-dbab-747a-f493636aca32-90e1fcb7"
                className="home-story-content"
              >
                <div className="margin-bottom margin-large">
                  <div className="home-feature-top">
                    <div className="padding-horizontal padding-medium">
                      <div className="home-feature-top-content">
                        <div className="text-size-xsmall">Our Approach</div>
                        <div className="text-size-xsmall">
                          Coastal Opportunities
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="padding-horizontal padding-medium">
                  <div
                    data-w-id="a7a574be-1dc5-567c-31de-90d9bd3b64ba"
                    className="margin-bottom margin-medium"
                  >
                    <div className="clip">
                      <SplitText
                        text="We Create"
                        className="heading-style-h2"
                        delay={100}
                        duration={0.6}
                        ease="power3.out"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="left"
                        onLetterAnimationComplete={handleAnimationComplete}
                      />
                    </div>
                    <div className="clip">
                      <h2 className="heading-style-h2">Generational Wealth</h2>
                    </div>
                  </div>
                  <div className="home-feature-text">
                    <p className="text-size-regular dual-paragraph text-color-grey">
                      Our investment philosophy allows you to experience what
                      it&apos;s like to build lasting prosperity through
                      Kenya&apos;s coastal transformation. With our carefully
                      selected properties, positioned during peak growth
                      periods, you can secure your family&apos;s financial
                      future against landscapes as far as an eye can see. With
                      premium locations and strategic timing, your investment
                      will become a legacy that lasts for generations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-event-type">
            <div>
              <div className="padding-bottom">
                <div className="padding-horizontal padding-medium">
                  <div className="padding-top padding-xlarge">
                    <div>
                      <div
                        id="w-node-_7101279c-d302-2be3-e9ac-276f4b4cb02f-90e1fcb7"
                        className="event-type-intro"
                      >
                        <div className="event-type-top">
                          <div
                            data-w-id="7101279c-d302-2be3-e9ac-276f4b4cb031"
                            className="margin-bottom margin-small"
                          >
                            <div className="clip">
                              <SplitText
                                text="Premium investments for every goal"
                                className="heading-style-h2"
                                delay={75}
                                duration={0.4}
                                ease="power3.out"
                                splitType="chars"
                                from={{ opacity: 0, y: 40 }}
                                to={{ opacity: 1, y: 0 }}
                                threshold={0.1}
                                rootMargin="-100px"
                                textAlign="center"
                                onLetterAnimationComplete={
                                  handleAnimationComplete
                                }
                              />
                            </div>
                          </div>
                          <div className="margin-bottom margin-large">
                            <div className="event-type-description">
                              <p className="text-size-regular text-align-center text-color-grey">
                                Built on institutional expertise and deep
                                coastal market insight, Nestline Capital brings
                                professional-grade investment opportunities to
                                discerning investors and wealth builders alike.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="home-services-block">
                  <div
                    id="w-node-_3919b2dd-25a4-81ff-a17a-989a8401af10-90e1fcb7"
                    data-w-id="3919b2dd-25a4-81ff-a17a-989a8401af10"
                    className="home-service-image left-side"
                  >
                    <div
                      id="w-node-_152a5ce0-13b7-4399-79a4-65fdc3a7fe47-90e1fcb7"
                      className="strip-loop"
                    >
                      <div className="home-hero-strip">
                        <div className="rotate-text">
                          <div className="text-size-xsmall">Karibu Malindi</div>
                          <div className="text-size-xsmall">
                            Explore Opportunities
                          </div>
                          <div className="text-size-xsmall">
                            Nestline Capital
                          </div>
                          <div className="text-size-xsmall">Karibu Malindi</div>
                          <div className="text-size-xsmall">
                            Explore Opportunities
                          </div>
                        </div>
                        <div className="rotate-text">
                          <div className="text-size-xsmall">Karibu Malindi</div>
                          <div className="text-size-xsmall">
                            Explore Opportunities
                          </div>
                          <div className="text-size-xsmall">
                            Nestline Capital
                          </div>
                          <div className="text-size-xsmall">Karibu Malindi</div>
                          <div className="text-size-xsmall">
                            Explore Opportunities
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="w-node-_3b85a2c4-d452-a167-eb42-e236d7850f26-90e1fcb7"
                      className="featured-background"
                    >
                      <Image
                        fill
                        src="/images/Malindi-1.webp"
                        loading="lazy"
                        alt=""
                        className="image-fill"
                      />
                      <div className="image-overlay hidden" />
                    </div>
                  </div>
                  <div
                    id="w-node-_3e0b3276-498d-6226-b729-c6a3f7549601-90e1fcb7"
                    className="padding-horizontal padding-medium"
                  >
                    <div
                      id="w-node-_70022944-97be-8e3b-6db0-886e995c6a05-90e1fcb7"
                      className="venue-type-right"
                    >
                      <div className="services-tab-list">
                        <div
                          data-w-id="fe094dee-8713-2384-fbe1-928a3b16ae17"
                          className="tab-item"
                        >
                          <div className="services-tab-top">
                            <div className="services-tab-block">
                              <div className="services-tab-grid">
                                <div
                                  id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1b-3b16ae17"
                                  className="clip"
                                >
                                  <div className="hover-text">
                                    <div
                                      id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1d-3b16ae17"
                                      className="text-size-small text-color-grey"
                                    >
                                      001
                                    </div>
                                  </div>
                                  <div className="hover-text bottom-hover-text">
                                    <div
                                      id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae20-3b16ae17"
                                      className="text-size-small text-color-grey"
                                    >
                                      001
                                    </div>
                                  </div>
                                </div>
                                <div
                                  id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae22-3b16ae17"
                                  className="text-size-regular"
                                >
                                  Land Banking
                                </div>
                                <div
                                  id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae24-3b16ae17"
                                  className="service-tab-icon"
                                >
                                  <Image
                                    fill
                                    src="/images/Icon-close-reg.svg"
                                    loading="lazy"
                                    alt=""
                                    className="icon-1x1-xxsmall"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="services-tab-bottom">
                            <div className="services-tab-block">
                              <div className="services-tab-content">
                                <div className="services-tab-grid">
                                  <p
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae2a-3b16ae17"
                                    className="text-size-regular text-color-grey"
                                  >
                                    Nestline Capital offers strategic land
                                    acquisition opportunities in Malindi&apos;s
                                    highest-potential corridors. Our
                                    research-driven approach identifies prime
                                    undeveloped parcels before infrastructure
                                    development drives exponential appreciation.
                                    Every plot comes with full due diligence,
                                    clear title documentation, and ongoing
                                    market analysis.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="line-bottom" />
                        </div>
                        <div
                          data-w-id="fe094dee-8713-2384-fbe1-928a3b16ae17"
                          className="tab-item"
                        >
                          <div className="services-tab-top">
                            <div className="services-tab-block">
                              <div className="services-tab-grid">
                                <div
                                  id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1b-3b16ae17"
                                  className="clip"
                                >
                                  <div className="hover-text">
                                    <div
                                      id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1d-3b16ae17"
                                      className="text-size-small text-color-grey"
                                    >
                                      002
                                    </div>
                                  </div>
                                  <div className="hover-text bottom-hover-text">
                                    <div
                                      id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae20-3b16ae17"
                                      className="text-size-small text-color-grey"
                                    >
                                      002
                                    </div>
                                  </div>
                                </div>
                                <div
                                  id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae22-3b16ae17"
                                  className="text-size-regular"
                                >
                                  Diaspora Investments
                                </div>
                                <div
                                  id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae24-3b16ae17"
                                  className="service-tab-icon"
                                >
                                  <Image
                                    fill
                                    src="/images/Icon-close-reg.svg"
                                    loading="lazy"
                                    alt=""
                                    className="icon-1x1-xxsmall"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="services-tab-bottom">
                            <div className="services-tab-block">
                              <div className="services-tab-content">
                                <div className="services-tab-grid">
                                  <p
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae2a-3b16ae17"
                                    className="text-size-regular text-color-grey"
                                  >
                                    Simplified overseas investment designed
                                    specifically for Kenyans living abroad. We
                                    handle everything from site selection and
                                    legal documentation to ongoing property
                                    management and progress reporting. Invest in
                                    Kenya&apos;s coastal growth from anywhere in
                                    the world with complete confidence and
                                    transparency.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="line-bottom" />
                        </div>
                        <div
                          data-w-id="fe094dee-8713-2384-fbe1-928a3b16ae17"
                          className="tab-item"
                        >
                          <div className="services-tab-top">
                            <div className="services-tab-block">
                              <div className="services-tab-grid">
                                <div
                                  id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1b-3b16ae17"
                                  className="clip"
                                >
                                  <div className="hover-text">
                                    <div
                                      id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1d-3b16ae17"
                                      className="text-size-small text-color-grey"
                                    >
                                      003
                                    </div>
                                  </div>
                                  <div className="hover-text bottom-hover-text">
                                    <div
                                      id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae20-3b16ae17"
                                      className="text-size-small text-color-grey"
                                    >
                                      003
                                    </div>
                                  </div>
                                </div>
                                <div
                                  id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae22-3b16ae17"
                                  className="text-size-regular"
                                >
                                  Gated Communities
                                </div>
                                <div
                                  id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae24-3b16ae17"
                                  className="service-tab-icon"
                                >
                                  <Image
                                    fill
                                    src="/images/Icon-close-reg.svg"
                                    loading="lazy"
                                    alt=""
                                    className="icon-1x1-xxsmall"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="services-tab-bottom">
                            <div className="services-tab-block">
                              <div className="services-tab-content">
                                <div className="services-tab-grid">
                                  <p
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae2a-3b16ae17"
                                    className="text-size-regular text-color-grey"
                                  >
                                    Exclusive residential developments combining
                                    modern amenities with coastal lifestyle. Our
                                    planned communities feature premium
                                    infrastructure, 24/7 security, and strategic
                                    locations near Malindi&apos;s growth
                                    centers. Each development is carefully
                                    planned to deliver both lifestyle
                                    enhancement and strong capital appreciation.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="line-bottom" />
                        </div>
                        <div
                          data-w-id="fe094dee-8713-2384-fbe1-928a3b16ae17"
                          className="tab-item"
                        >
                          <div className="services-tab-top">
                            <div className="services-tab-block">
                              <div className="services-tab-grid">
                                <div
                                  id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1b-3b16ae17"
                                  className="clip"
                                >
                                  <div className="hover-text">
                                    <div
                                      id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1d-3b16ae17"
                                      className="text-size-small text-color-grey"
                                    >
                                      004
                                    </div>
                                  </div>
                                  <div className="hover-text bottom-hover-text">
                                    <div
                                      id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae20-3b16ae17"
                                      className="text-size-small text-color-grey"
                                    >
                                      004
                                    </div>
                                  </div>
                                </div>
                                <div
                                  id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae22-3b16ae17"
                                  className="text-size-regular"
                                >
                                  Commercial Ventures
                                </div>
                                <div
                                  id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae24-3b16ae17"
                                  className="service-tab-icon"
                                >
                                  <Image
                                    fill
                                    src="/images/Icon-close-reg.svg"
                                    loading="lazy"
                                    alt=""
                                    className="icon-1x1-xxsmall"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="services-tab-bottom">
                            <div className="services-tab-block">
                              <div className="services-tab-content">
                                <div className="services-tab-grid">
                                  <p
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae2a-3b16ae17"
                                    className="text-size-regular text-color-grey"
                                  >
                                    High-yield commercial real estate
                                    opportunities in Malindi&apos;s expanding
                                    tourism and business sectors. From
                                    beachfront hospitality projects to retail
                                    developments, we structure joint ventures
                                    that capitalize on the region&apos;s
                                    economic transformation. Professional
                                    management ensures optimal returns and
                                    reduced investor risk.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="line-bottom" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-action">
            <div>
              <div className="padding-top padding-xlarge">
                <div className="padding-horizontal padding-medium">
                  <div className="venue-story-grid">
                    <div
                      id="w-node-_7fb8c04c-61c9-9be9-2266-0dbc9c6a120c-90e1fcb7"
                      className="small-action-block"
                    >
                      <div className="venue-heading">
                        <div className="margin-bottom margin-small">
                          <div className="services-hero-description">
                            <p className="text-size-regular text-align-center text-color-grey">
                              Our properties provide the ultimate in coastal
                              beauty and investment potential. We ensure no two
                              opportunities are ever the same.
                            </p>
                          </div>
                        </div>
                        <a
                          href="projects.html"
                          className="button is-icon w-inline-block"
                        >
                          <div className="clip">
                            <div className="button-text">
                              <div className="text-size-tiny text-color-black">
                                View opportunities
                              </div>
                            </div>
                            <div className="button-text button-text-bottom">
                              <div className="text-size-tiny text-color-black">
                                View opportunities
                              </div>
                            </div>
                          </div>
                          <div className="clip">
                            <div className="button-icon">
                              <Image
                                fill
                                src="/images/Right-arrow-slant---dark.svg"
                                loading="lazy"
                                alt=""
                                className="icon-1x1-small"
                              />
                            </div>
                            <div className="button-icon button-icon-bottom">
                              <Image
                                fill
                                src="/images/Right-arrow-slant---dark.svg"
                                loading="lazy"
                                alt=""
                                className="icon-1x1-small"
                              />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div
                      id="w-node-_7fb8c04c-61c9-9be9-2266-0dbc9c6a1224-90e1fcb7"
                      data-w-id="7fb8c04c-61c9-9be9-2266-0dbc9c6a1224"
                      className="slow-paralax"
                    >
                      <div
                        id="w-node-_7fb8c04c-61c9-9be9-2266-0dbc9c6a1225-90e1fcb7"
                        className="venue-story-image"
                      >
                        <div className="venue-story-item right-story-item">
                          <div className="image-overlay hidden" />
                          <Image
                            fill
                            src="/images/estate_2.webp"
                            loading="lazy"
                            sizes="100vw"
                            alt=""
                            className="image-fill"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      id="w-node-_7fb8c04c-61c9-9be9-2266-0dbc9c6a1229-90e1fcb7"
                      data-w-id="7fb8c04c-61c9-9be9-2266-0dbc9c6a1229"
                      className="fast-paralax"
                    >
                      <div
                        id="w-node-_7fb8c04c-61c9-9be9-2266-0dbc9c6a122a-90e1fcb7"
                        className="venue-story-image"
                      >
                        <div className="venue-story-item">
                          <div className="image-overlay hidden" />
                          <Image
                            fill
                            src="/images/shoreline_1.webp"
                            loading="lazy"
                            sizes="100vw"
                            alt=""
                            className="image-fill"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="venue-scrolling">
            <div>
              <div className="padding-bottom padding-medium">
                <div className="home-gallery-block">
                  <div className="home-gallery">
                    <div className="home-gallery-images">
                      <div className="home-gallery-strip">
                        <div
                          id="w-node-_0ec1fb92-3300-d505-8f47-577f2ac4749c-2ac4748c"
                          className="home-gallery-item"
                        >
                          <div className="home-gallery-height" />
                          <div className="featured-background">
                            <div className="image-overlay hidden" />
                            <Image
                              fill
                              src="/images/estate_1.webp"
                              loading="lazy"
                              alt=""
                              sizes="100vw"
                              className="image-fill"
                            />
                          </div>
                        </div>
                        <div
                          id="w-node-_0ec1fb92-3300-d505-8f47-577f2ac474a1-2ac4748c"
                          className="home-gallery-item"
                        >
                          <div className="home-gallery-height" />
                          <div className="featured-background">
                            <div className="image-overlay hidden" />
                            <Image
                              fill
                              src="/images/horizon_1.webp"
                              loading="lazy"
                              alt=""
                              sizes="100vw"
                              className="image-fill"
                            />
                          </div>
                        </div>
                        <div
                          id="w-node-_0ec1fb92-3300-d505-8f47-577f2ac474a6-2ac4748c"
                          className="home-gallery-item"
                        >
                          <div className="home-gallery-height" />
                          <div className="featured-background">
                            <div className="image-overlay hidden" />
                            <Image
                              fill
                              src="/images/coastline_2.webp"
                              loading="lazy"
                              alt=""
                              sizes="100vw"
                              className="image-fill"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="home-gallery-strip">
                        <div
                          id="w-node-_0ec1fb92-3300-d505-8f47-577f2ac4749c-2ac4748c"
                          className="home-gallery-item"
                        >
                          <div className="home-gallery-height" />
                          <div className="featured-background">
                            <div className="image-overlay hidden" />
                            <Image
                              fill
                              src="/images/estate_2.webp"
                              loading="lazy"
                              alt=""
                              sizes="100vw"
                              className="image-fill"
                            />
                          </div>
                        </div>
                        <div
                          id="w-node-_0ec1fb92-3300-d505-8f47-577f2ac474a1-2ac4748c"
                          className="home-gallery-item"
                        >
                          <div className="home-gallery-height" />
                          <div className="featured-background">
                            <div className="image-overlay hidden" />
                            <Image
                              fill
                              src="/images/shoreline_1.webp"
                              loading="lazy"
                              alt=""
                              sizes="100vw"
                              className="image-fill"
                            />
                          </div>
                        </div>
                        <div
                          id="w-node-_0ec1fb92-3300-d505-8f47-577f2ac474a6-2ac4748c"
                          className="home-gallery-item"
                        >
                          <div className="home-gallery-height" />
                          <div className="featured-background">
                            <div className="image-overlay hidden" />
                            <Image
                              fill
                              src="/images/skyline_1.webp"
                              loading="lazy"
                              alt=""
                              sizes="100vw"
                              className="image-fill"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="home-gallery-intro">
                      <div data-w-id="0b744d38-3f8b-1602-962c-4245f5bcfae4">
                        <div className="margin-bottom margin-small">
                          <div className="text-size-small text-align-center text-color-white">
                            Explore
                          </div>
                        </div>
                        <div className="clip">
                          <SplitText
                            text="Opportunities"
                            className="heading-style-h1 text-color-white"
                            delay={75}
                            duration={0.4}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    data-w-id="3ae99433-b732-62d1-acba-4ca16ca66f0c"
                    className="home-gallery-trigger"
                  />
                </div>
                <div className="padding-horizontal padding-medium">
                  <div className="home-venue-block">
                    <div className="margin-bottom margin-xsmall">
                      <div className="home-project-grid hide-tablet">
                        <div className="text-size-xsmall text-color-grey">
                          Project
                        </div>
                        <div
                          id="w-node-_7dfd62d6-a51e-9ac4-0e09-4e8ee2ade88c-90e1fcb7"
                          className="text-size-xsmall text-color-grey"
                        >
                          Investment Capacity
                        </div>
                      </div>
                    </div>
                    <div className="home-project-wrapper">
                      <div className="home-project-list">
                        <a
                          href="palmcrest-residences-phase-1.html"
                          className="home-project-item w-inline-block"
                        >
                          <div className="home-project-grid">
                            <h3
                              id="w-node-f0825d28-9297-0619-75a8-908c929ad1ea-90e1fcb7"
                              className="heading-style-h3"
                            >
                              PalmCrest Residences 1
                            </h3>
                            <div
                              id="w-node-eb9df051-e172-168d-82f6-aaae743a2828-90e1fcb7"
                              className="venue-item-image"
                            >
                              <div className="venue-image-item">
                                <Image
                                  fill
                                  loading="lazy"
                                  alt=""
                                  src="/images/estate_1.webp"
                                  className="image-fill"
                                />
                              </div>
                            </div>
                            <div
                              id="w-node-c2aad42e-7a10-9eb6-c413-4546678e6f76-90e1fcb7"
                              className="clip"
                            >
                              <div className="button-text">
                                <div className="text-size-small">
                                  USD 12,000 +
                                </div>
                              </div>
                              <div className="button-text button-text-bottom">
                                <div className="text-size-small">
                                  USD 12,000 +
                                </div>
                              </div>
                            </div>
                            <div
                              id="w-node-c2d7cdb5-eb51-0a07-0751-4dfb589f244a-90e1fcb7"
                              className="clip"
                            >
                              <div className="button-icon">
                                <Image
                                  fill
                                  src="/images/Icon-upright-reg.svg"
                                  loading="lazy"
                                  alt=""
                                  className="icon-1x1-medium"
                                />
                              </div>
                              <div className="button-icon button-icon-bottom">
                                <Image
                                  fill
                                  src="/images/Icon-upright-reg.svg"
                                  loading="lazy"
                                  alt=""
                                  className="icon-1x1-medium"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="line-bottom" />
                        </a>
                        <a
                          href="palmcrest-residences-phase-2.html"
                          className="home-project-item w-inline-block"
                        >
                          <div className="home-project-grid">
                            <h3
                              id="w-node-c98ae6a2-7c8b-916d-02ae-a66626170670-90e1fcb7"
                              className="heading-style-h3"
                            >
                              PalmCrest Residences 2
                            </h3>
                            <div
                              id="w-node-c98ae6a2-7c8b-916d-02ae-a66626170672-90e1fcb7"
                              className="venue-item-image"
                            >
                              <div className="venue-image-item">
                                <Image
                                  fill
                                  loading="lazy"
                                  alt=""
                                  src="/images/beachline_1.webp"
                                  className="image-fill"
                                />
                              </div>
                            </div>
                            <div
                              id="w-node-c98ae6a2-7c8b-916d-02ae-a66626170676-90e1fcb7"
                              className="clip"
                            >
                              <div className="button-text">
                                <div className="text-size-small">
                                  USD 14,500 +
                                </div>
                              </div>
                              <div className="button-text button-text-bottom">
                                <div className="text-size-small">
                                  USD 14,500 +
                                </div>
                              </div>
                            </div>
                            <div
                              id="w-node-c98ae6a2-7c8b-916d-02ae-a6662617067d-90e1fcb7"
                              className="clip"
                            >
                              <div className="button-icon">
                                <Image
                                  fill
                                  src="/images/Icon-upright-reg.svg"
                                  loading="lazy"
                                  alt=""
                                  className="icon-1x1-medium"
                                />
                              </div>
                              <div className="button-icon button-icon-bottom">
                                <Image
                                  fill
                                  src="/images/Icon-upright-reg.svg"
                                  loading="lazy"
                                  alt=""
                                  className="icon-1x1-medium"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="line-bottom" />
                        </a>
                        <a
                          href="azuredune-developments.html"
                          className="home-project-item w-inline-block"
                        >
                          <div className="home-project-grid">
                            <h3
                              id="w-node-_94da17c0-60c6-8344-c285-b981e6406ee8-90e1fcb7"
                              className="heading-style-h3"
                            >
                              AzureDune Developments
                            </h3>
                            <div
                              id="w-node-_94da17c0-60c6-8344-c285-b981e6406eea-90e1fcb7"
                              className="venue-item-image"
                            >
                              <div className="venue-image-item">
                                <Image
                                  fill
                                  loading="lazy"
                                  alt=""
                                  src="/images/estate_2.webp"
                                  className="image-fill"
                                />
                              </div>
                            </div>
                            <div
                              id="w-node-_94da17c0-60c6-8344-c285-b981e6406eee-90e1fcb7"
                              className="clip"
                            >
                              <div className="button-text">
                                <div className="text-size-small">
                                  Coming Soon
                                </div>
                              </div>
                              <div className="button-text button-text-bottom">
                                <div className="text-size-small">
                                  USD 9,500 +
                                </div>
                              </div>
                            </div>
                            <div
                              id="w-node-_94da17c0-60c6-8344-c285-b981e6406ef5-90e1fcb7"
                              className="clip"
                            >
                              <div className="button-icon">
                                <Image
                                  fill
                                  src="/images/Icon-upright-reg.svg"
                                  loading="lazy"
                                  alt=""
                                  className="icon-1x1-medium"
                                />
                              </div>
                              <div className="button-icon button-icon-bottom">
                                <Image
                                  fill
                                  src="/images/Icon-upright-reg.svg"
                                  loading="lazy"
                                  alt=""
                                  className="icon-1x1-medium"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="line-bottom" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-services">
            <div>
              <div className="padding-vertical">
                <div className="padding-horizontal">
                  <div className="home-services-block">
                    <div
                      id="w-node-_05f822d8-d44f-3c3a-42ad-44898269806e-90e1fcb7"
                      className="home-service-image left-side"
                    >
                      <div
                        id="w-node-_05f822d8-d44f-3c3a-42ad-44898269806f-90e1fcb7"
                        className="strip-loop"
                      >
                        <div className="home-hero-strip">
                          <div className="rotate-text">
                            <div className="text-size-xsmall">
                              Karibu Malindi
                            </div>
                            <div className="text-size-xsmall">
                              Explore Opportunities
                            </div>
                            <div className="text-size-xsmall">
                              Nestline Capital
                            </div>
                            <div className="text-size-xsmall">
                              Karibu Malindi
                            </div>
                            <div className="text-size-xsmall">
                              Explore Opportunities
                            </div>
                          </div>
                          <div className="rotate-text">
                            <div className="text-size-xsmall">
                              Karibu Malindi
                            </div>
                            <div className="text-size-xsmall">
                              Explore Opportunities
                            </div>
                            <div className="text-size-xsmall">
                              Nestline Capital
                            </div>
                            <div className="text-size-xsmall">
                              Karibu Malindi
                            </div>
                            <div className="text-size-xsmall">
                              Explore Opportunities
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="w-node-_05f822d8-d44f-3c3a-42ad-448982698073-90e1fcb7"
                        className="featured-background"
                      >
                        <Image
                          fill
                          src="/images/estate_2.webp"
                          loading="lazy"
                          sizes="100vw"
                          alt=""
                          className="image-fill"
                        />
                        <div className="image-overlay hidden" />
                      </div>
                    </div>
                    <div
                      id="w-node-_05f822d8-d44f-3c3a-42ad-448982698076-90e1fcb7"
                      className="padding-horizontal padding-medium"
                    >
                      <div
                        id="w-node-_05f822d8-d44f-3c3a-42ad-448982698077-90e1fcb7"
                        className="home-services-right"
                      >
                        <div
                          data-w-id="05f822d8-d44f-3c3a-42ad-448982698078"
                          className="margin-bottom margin-medium"
                        >
                          <div className="clip">
                            <SplitText
                              text="Elevate your Investment Journey"
                              className="heading-style-h2"
                              delay={60}
                              duration={0.3}
                              ease="power3.out"
                              splitType="chars"
                              from={{ opacity: 0, y: 40 }}
                              to={{ opacity: 1, y: 0 }}
                              threshold={0.1}
                              rootMargin="-100px"
                              textAlign="left"
                              onLetterAnimationComplete={
                                handleAnimationComplete
                              }
                            />
                          </div>
                        </div>
                        <div
                          data-w-id="05f822d8-d44f-3c3a-42ad-4489826980a7"
                          className="margin-bottom margin-medium"
                        >
                          <div className="home-services-image">
                            <div className="home-services-height" />
                            <div className="featured-background">
                              <Image
                                fill
                                src="/images/shoreline_1.webp"
                                loading="lazy"
                                sizes="100vw"
                                alt=""
                                className="image-fill"
                              />
                              <div className="image-overlay hidden" />
                            </div>
                          </div>
                        </div>
                        <div className="margin-bottom margin-large">
                          <div className="home-feature-text">
                            <p className="text-size-regular dual-paragraph text-color-grey">
                              Our investment experience provides the ultimate in
                              personalized guidance and market insight. Enjoy
                              expert consultation, exclusive property access,
                              and comprehensive market analysis as you build
                              wealth in our carefully selected coastal settings
                              with your financial future and family. We also
                              work with trusted local professionals to ensure no
                              two investment journeys are ever the same - each
                              one is truly unique!
                            </p>
                          </div>
                        </div>
                        <div className="services-tab-list">
                          <div
                            data-w-id="fe094dee-8713-2384-fbe1-928a3b16ae17"
                            className="tab-item"
                          >
                            <div className="services-tab-top">
                              <div className="services-tab-block">
                                <div className="services-tab-grid">
                                  <div
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1b-3b16ae17"
                                    className="clip"
                                  >
                                    <div className="hover-text">
                                      <div
                                        id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1d-3b16ae17"
                                        className="text-size-small text-color-grey"
                                      >
                                        001
                                      </div>
                                    </div>
                                    <div className="hover-text bottom-hover-text">
                                      <div
                                        id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae20-3b16ae17"
                                        className="text-size-small text-color-grey"
                                      >
                                        001
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae22-3b16ae17"
                                    className="text-size-regular"
                                  >
                                    Property Viewings
                                  </div>
                                  <div
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae24-3b16ae17"
                                    className="service-tab-icon"
                                  >
                                    <Image
                                      fill
                                      src="/images/Icon-close-reg.svg"
                                      loading="lazy"
                                      alt=""
                                      className="icon-1x1-xxsmall"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="services-tab-bottom">
                              <div className="services-tab-block">
                                <div className="services-tab-content">
                                  <div className="services-tab-grid">
                                    <p
                                      id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae2a-3b16ae17"
                                      className="text-size-regular text-color-grey"
                                    >
                                      Guided tours of all available coastal
                                      properties with detailed market analysis
                                      and growth potential assessment.
                                      Professional site inspections with
                                      surveying insights and infrastructure
                                      development timelines.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="line-bottom" />
                          </div>
                          <div
                            data-w-id="fe094dee-8713-2384-fbe1-928a3b16ae17"
                            className="tab-item"
                          >
                            <div className="services-tab-top">
                              <div className="services-tab-block">
                                <div className="services-tab-grid">
                                  <div
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1b-3b16ae17"
                                    className="clip"
                                  >
                                    <div className="hover-text">
                                      <div
                                        id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1d-3b16ae17"
                                        className="text-size-small text-color-grey"
                                      >
                                        002
                                      </div>
                                    </div>
                                    <div className="hover-text bottom-hover-text">
                                      <div
                                        id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae20-3b16ae17"
                                        className="text-size-small text-color-grey"
                                      >
                                        002
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae22-3b16ae17"
                                    className="text-size-regular"
                                  >
                                    Investment Consultation
                                  </div>
                                  <div
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae24-3b16ae17"
                                    className="service-tab-icon"
                                  >
                                    <Image
                                      fill
                                      src="/images/Icon-close-reg.svg"
                                      loading="lazy"
                                      alt=""
                                      className="icon-1x1-xxsmall"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="services-tab-bottom">
                              <div className="services-tab-block">
                                <div className="services-tab-content">
                                  <div className="services-tab-grid">
                                    <p
                                      id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae2a-3b16ae17"
                                      className="text-size-regular text-color-grey"
                                    >
                                      Personalized one-on-one sessions to match
                                      your financial goals with optimal property
                                      opportunities. Comprehensive portfolio
                                      planning with risk assessment and return
                                      projections tailored to your situation.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="line-bottom" />
                          </div>
                          <div
                            data-w-id="fe094dee-8713-2384-fbe1-928a3b16ae17"
                            className="tab-item"
                          >
                            <div className="services-tab-top">
                              <div className="services-tab-block">
                                <div className="services-tab-grid">
                                  <div
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1b-3b16ae17"
                                    className="clip"
                                  >
                                    <div className="hover-text">
                                      <div
                                        id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1d-3b16ae17"
                                        className="text-size-small text-color-grey"
                                      >
                                        003
                                      </div>
                                    </div>
                                    <div className="hover-text bottom-hover-text">
                                      <div
                                        id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae20-3b16ae17"
                                        className="text-size-small text-color-grey"
                                      >
                                        003
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae22-3b16ae17"
                                    className="text-size-regular"
                                  >
                                    Market Research
                                  </div>
                                  <div
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae24-3b16ae17"
                                    className="service-tab-icon"
                                  >
                                    <Image
                                      fill
                                      src="/images/Icon-close-reg.svg"
                                      loading="lazy"
                                      alt=""
                                      className="icon-1x1-xxsmall"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="services-tab-bottom">
                              <div className="services-tab-block">
                                <div className="services-tab-content">
                                  <div className="services-tab-grid">
                                    <p
                                      id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae2a-3b16ae17"
                                      className="text-size-regular text-color-grey"
                                    >
                                      In-depth coastal market analysis including
                                      infrastructure projects, tourism
                                      development, and appreciation trends.
                                      Exclusive insights into upcoming
                                      opportunities and timing strategies for
                                      maximum returns.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="line-bottom" />
                          </div>
                          <div
                            data-w-id="fe094dee-8713-2384-fbe1-928a3b16ae17"
                            className="tab-item"
                          >
                            <div className="services-tab-top">
                              <div className="services-tab-block">
                                <div className="services-tab-grid">
                                  <div
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1b-3b16ae17"
                                    className="clip"
                                  >
                                    <div className="hover-text">
                                      <div
                                        id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae1d-3b16ae17"
                                        className="text-size-small text-color-grey"
                                      >
                                        004
                                      </div>
                                    </div>
                                    <div className="hover-text bottom-hover-text">
                                      <div
                                        id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae20-3b16ae17"
                                        className="text-size-small text-color-grey"
                                      >
                                        004
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae22-3b16ae17"
                                    className="text-size-regular"
                                  >
                                    Legal Support
                                  </div>
                                  <div
                                    id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae24-3b16ae17"
                                    className="service-tab-icon"
                                  >
                                    <Image
                                      fill
                                      src="/images/Icon-close-reg.svg"
                                      loading="lazy"
                                      alt=""
                                      className="icon-1x1-xxsmall"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="services-tab-bottom">
                              <div className="services-tab-block">
                                <div className="services-tab-content">
                                  <div className="services-tab-grid">
                                    <p
                                      id="w-node-fe094dee-8713-2384-fbe1-928a3b16ae2a-3b16ae17"
                                      className="text-size-regular text-color-grey"
                                    >
                                      Complete legal assistance from purchase to
                                      title transfer with trusted local
                                      advocates and surveyors. Full
                                      documentation support including due
                                      diligence, compliance verification, and
                                      ownership protection.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="line-bottom" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-action">
            <div>
              <div className="padding-vertical padding-xlarge">
                <div className="padding-horizontal padding-medium">
                  <div className="venue-story-grid">
                    <div
                      id="w-node-_7c81c254-3f2c-7460-335d-b312bade27ec-90e1fcb7"
                      className="intro-block"
                    >
                      <div className="venue-heading">
                        <div className="margin-bottom margin-medium">
                          <p className="text-size-large text-align-center">
                            Imagine yourself looking over the horizon as the sun
                            falls below the ocean.
                          </p>
                        </div>
                        <div className="margin-bottom margin-small">
                          <div className="services-hero-description">
                            <p className="text-size-regular text-align-center text-color-grey">
                              Our properties provide the ultimate in coastal
                              beauty and investment returns. We ensure no two
                              opportunities are ever the same.
                            </p>
                          </div>
                        </div>
                        <a
                          href="projects.html"
                          className="button is-icon w-inline-block"
                        >
                          <div className="clip">
                            <div className="button-text">
                              <div className="text-size-tiny text-color-black">
                                Get In Touch
                              </div>
                            </div>
                            <div className="button-text button-text-bottom">
                              <div className="text-size-tiny text-color-black">
                                Get In Touch
                              </div>
                            </div>
                          </div>
                          <div className="clip">
                            <div className="button-icon">
                              <Image
                                fill
                                src="/images/Right-arrow-slant---dark.svg"
                                loading="lazy"
                                alt=""
                                className="icon-1x1-small"
                              />
                            </div>
                            <div className="button-icon button-icon-bottom">
                              <Image
                                fill
                                src="/images/Right-arrow-slant---dark.svg"
                                loading="lazy"
                                alt=""
                                className="icon-1x1-small"
                              />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div
                      id="w-node-_7c81c254-3f2c-7460-335d-b312bade2804-90e1fcb7"
                      data-w-id="7c81c254-3f2c-7460-335d-b312bade2804"
                      className="slow-paralax"
                    >
                      <div
                        id="w-node-_7c81c254-3f2c-7460-335d-b312bade2805-90e1fcb7"
                        className="venue-story-image"
                      >
                        <div className="venue-story-item right-story-item">
                          <div className="image-overlay hidden" />
                          <Image
                            fill
                            src="/images/skyline_1.webp"
                            loading="lazy"
                            sizes="100vw"
                            alt=""
                            className="image-fill"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      id="w-node-_7c81c254-3f2c-7460-335d-b312bade2809-90e1fcb7"
                      data-w-id="7c81c254-3f2c-7460-335d-b312bade2809"
                      className="fast-paralax"
                    >
                      <div
                        id="w-node-_7c81c254-3f2c-7460-335d-b312bade280a-90e1fcb7"
                        className="venue-story-image"
                      >
                        <div className="venue-story-item">
                          <div className="image-overlay hidden" />
                          <Image
                            fill
                            src="/images/horizon_1.webp"
                            loading="lazy"
                            sizes="100vw"
                            alt=""
                            className="image-fill"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="home-footer-action">
            <div
              data-w-id="9d7103d6-381f-b2ef-8d89-530095247291"
              className="call-block"
            >
              <div className="featured-background">
                <Image
                  fill
                  src="/images/coastline_1.webp"
                  loading="lazy"
                  sizes="100vw"
                  alt=""
                  className="image-fill"
                />
                <div className="image-overlay hidden" />
              </div>
              <div className="home-feature-content">
                <div className="strip-loop">
                  <div className="home-hero-strip">
                    <div className="rotate-text">
                      <div className="text-size-xsmall">Karibu Malindi</div>
                      <div className="text-size-xsmall">
                        Explore Opportunities
                      </div>
                      <div className="text-size-xsmall">Nestline Capital</div>
                      <div className="text-size-xsmall">Karibu Malindi</div>
                      <div className="text-size-xsmall">
                        Explore Opportunities
                      </div>
                    </div>
                    <div className="rotate-text">
                      <div className="text-size-xsmall">Karibu Malindi</div>
                      <div className="text-size-xsmall">
                        Explore Opportunities
                      </div>
                      <div className="text-size-xsmall">Nestline Capital</div>
                      <div className="text-size-xsmall">Karibu Malindi</div>
                      <div className="text-size-xsmall">
                        Explore Opportunities
                      </div>
                    </div>
                  </div>
                </div>
                <div className="call-grid">
                  <div className="padding-horizontal padding-medium">
                    <div
                      id="w-node-_9d7103d6-381f-b2ef-8d89-5300952472a4-90e1fcb7"
                      className="call-grid-content"
                    >
                      <div
                        id="w-node-_9d7103d6-381f-b2ef-8d89-5300952472a5-90e1fcb7"
                        data-w-id="9d7103d6-381f-b2ef-8d89-5300952472a5"
                        className="margin-bottom"
                      >
                        <div className="clip">
                          <SplitText
                            text="Plan a visit for your next investment"
                            className="heading-style-h2"
                            delay={60}
                            duration={0.3}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="left"
                            onLetterAnimationComplete={handleAnimationComplete}
                          />
                        </div>
                      </div>
                      <div className="call-text">
                        <div className="margin-bottom margin-small">
                          <p className="text-size-regular text-color-grey">
                            We are more than happy to have you visit us as we
                            guide your next steps.
                          </p>
                        </div>
                        <a
                          href="contact.html"
                          className="button is-icon w-inline-block"
                        >
                          <div className="clip">
                            <div className="button-text">
                              <div className="text-size-tiny text-color-black">
                                Schedule a Visit
                              </div>
                            </div>
                            <div className="button-text button-text-bottom">
                              <div className="text-size-tiny text-color-black">
                                Schedule a Visit
                              </div>
                            </div>
                          </div>
                          <div className="clip">
                            <div className="button-icon">
                              <Image
                                fill
                                src="/images/Right-arrow-slant---dark.svg"
                                loading="lazy"
                                alt=""
                                className="icon-1x1-small"
                              />
                            </div>
                            <div className="button-icon button-icon-bottom">
                              <Image
                                fill
                                src="/images/Right-arrow-slant---dark.svg"
                                loading="lazy"
                                alt=""
                                className="icon-1x1-small"
                              />
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
