import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { EventCard } from "@/components/event-card";
import { ProsperWordmark } from "@/components/prosper-wordmark";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { galleryImages } from "@/data/gallery";
import { events } from "@/data/events";

const upcomingEvents = events.filter((event) => event.status === "upcoming").slice(0, 3);
const galleryPreview = galleryImages.slice(0, 6);

export default function HomePage() {
  return (
    <div className="pb-24 pt-24 sm:pt-28">
      <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <div className="floral-watercolor floral-watercolor-hero" />
        <div className="floral-spray floral-spray-left" />
        <div className="floral-spray floral-spray-right" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="relative z-10">
            <p className="eyebrow">Curated events in Ottawa & Gatineau</p>
            <div className="mt-8">
              <ProsperWordmark
                priority
                className="h-16 w-72 sm:h-20 sm:w-96 lg:h-24 lg:w-[34rem]"
              />
            </div>
            <h1 className="mt-8 max-w-3xl font-display text-6xl leading-[0.94] text-ink sm:text-7xl lg:text-[6.25rem]">
              Curated evenings in Ottawa & Gatineau.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-navy/72 sm:text-lg">
              Intimate events shaped by atmosphere, taste, and connection.
              Prosper Events creates social experiences with a French-European
              sense of detail: quiet luxury, warm hospitality, and rooms
              designed for real conversation.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/events">View Upcoming Events</ButtonLink>
              <ButtonLink href="/inquiries" variant="secondary">
                Make an Inquiry
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal className="relative lg:pl-10" delay={0.14}>
            <div className="relative mx-auto max-w-[34rem]">
              <div className="grid gap-5 sm:grid-cols-[0.75fr_1fr]">
                <div className="luxury-card self-end overflow-hidden p-3 sm:mb-10">
                  <div className="floral-corner floral-corner-top-right" />
                  <Image
                    src={galleryPreview[0]?.src ?? "/assets/gallery/march-1/1-_DSC9572.jpg"}
                    alt="Guests in conversation at Prosper Events"
                    width={1200}
                    height={900}
                    className="h-full min-h-[280px] w-full rounded-[1.5rem] object-cover"
                  />
                </div>
                <div className="space-y-5">
                  <div className="luxury-card overflow-hidden p-3">
                    <div className="floral-corner floral-corner-bottom-left" />
                    <Image
                      src={galleryPreview[1]?.src ?? "/assets/gallery/march-1/2-_DSC9573.jpg"}
                      alt="Cocktail service at Prosper Events"
                      width={1200}
                      height={1600}
                      className="h-[360px] w-full rounded-[1.5rem] object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-[1.6rem] border border-navy/10 bg-white/72 p-6 shadow-paper">
                    <div className="floral-corner floral-corner-top-right" />
                    <p className="text-[11px] uppercase tracking-[0.24em] text-navy/48">
                      Signature mood
                    </p>
                    <p className="mt-4 font-display text-3xl text-ink">
                      Composed with intention.
                    </p>
                    <p className="mt-3 text-sm leading-7 text-navy/68">
                      Hospitality, music, food, and mood brought together in a
                      room that never feels overdone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal className="relative">
            <div className="section-frame">
              <div className="section-floral" />
              <p className="eyebrow">Brand story</p>
              <h2 className="mt-6 font-display text-4xl text-ink sm:text-5xl">
                Prosper Events, with atmosphere at the center.
              </h2>
              <p className="mt-6 text-base leading-8 text-navy/74">
                Prosper Events is an event curation company bringing elevated nightlife experiences to Ottawa and Gatineau. Partnering with local venues, mixologists, and creatives, we design specialty events centered around curated cocktails, vibrant music, and exceptional food. Our focus is on crafting immersive social environments where energy, ambiance, and connection come together seamlessly. From stylish pop-up gatherings to dynamic nightlife showcases, each event is intentionally curated to create memorable shared experiences. At Prosper Events, our mission is simple: bring people together through thoughtfully designed events that celebrate drink, music, and community.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="luxury-card relative overflow-hidden p-3">
              <div className="section-floral opacity-75" />
              <div className="floral-corner floral-corner-bottom-left" />
              <Image
                src={galleryPreview[2]?.src ?? "/assets/gallery/march-1/3-_DSC9574.jpg"}
                alt="Prosper Events March 1 atmosphere"
                width={1400}
                height={1600}
                className="h-[520px] w-full rounded-[1.6rem] object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Upcoming events</p>
              <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
                Invitations to the next evening.
              </h2>
            </div>
            <ButtonLink href="/events" variant="secondary">
              View All Events
            </ButtonLink>
          </Reveal>
          {upcomingEvents.length === 0 ? (
            <div className="mt-12 rounded-[2rem] border border-navy/10 bg-white/65 px-6 py-16 text-center shadow-paper">
              <p className="font-display text-4xl text-ink">No events to see here!</p>
            </div>
          ) : (
            <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <StaggerItem key={event.slug}>
                  <EventCard event={event} />
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="section-frame">
            <div className="section-floral" />
            <p className="eyebrow">Experience</p>
            <h2 className="mt-5 font-display text-4xl text-ink sm:text-5xl">
              A carefully composed evening.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-8 text-navy/72">
              <p>Designed for conversation.</p>
              <p>
                Where hospitality meets atmosphere, and every detail supports
                the room rather than competing with it.
              </p>
              <p>
                Prosper Events brings music, food, drinks, and social rhythm
                together with intention.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="luxury-card overflow-hidden p-3">
                <div className="floral-corner floral-corner-top-right" />
                <Image
                  src={galleryPreview[3]?.src ?? "/assets/gallery/march-1/4-_DSC9576.jpg"}
                  alt="Guests in conversation at Prosper Events"
                  width={1400}
                  height={900}
                  className="h-full min-h-[340px] w-full rounded-[1.5rem] object-cover"
                />
              </div>
                <div className="grid gap-5">
                  <div className="rounded-[1.8rem] border border-navy/10 bg-white/75 p-6 shadow-paper">
                    <p className="eyebrow">01</p>
                    <p className="mt-4 font-display text-2xl text-ink">
                      Service with warmth
                  </p>
                  <p className="mt-3 text-sm leading-7 text-navy/68">
                    Attentive without intrusion, polished without stiffness.
                  </p>
                </div>
                <div className="rounded-[1.8rem] border border-navy/10 bg-white/75 p-6 shadow-paper">
                  <p className="eyebrow">02</p>
                  <p className="mt-4 font-display text-2xl text-ink">
                    Rooms with mood
                  </p>
                  <p className="mt-3 text-sm leading-7 text-navy/68">
                    Lighting, texture, and timing curated to feel cinematic and
                    intimate.
                  </p>
                </div>
                <div className="rounded-[1.8rem] border border-navy/10 bg-white/75 p-6 shadow-paper">
                  <p className="eyebrow">03</p>
                  <p className="mt-4 font-display text-2xl text-ink">
                    Social design
                  </p>
                  <p className="mt-3 text-sm leading-7 text-navy/68">
                    A guest experience built around ease, pacing, and genuine
                    connection.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Gallery preview</p>
              <h2 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
                Moments from the room.
              </h2>
            </div>
            <ButtonLink href="/gallery" variant="secondary">
              Explore the Gallery
            </ButtonLink>
          </Reveal>
          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {galleryPreview.map((image, index) => (
              <Reveal key={image.id} delay={index * 0.05} className="mb-5 break-inside-avoid">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                className="h-auto w-full rounded-[1.4rem] object-cover transition duration-700 hover:scale-[1.02]"
              />
            </Reveal>
          ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-6 pt-8 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2.4rem] border border-navy/10 bg-white/78 px-6 py-12 shadow-paper sm:px-10 lg:px-14 lg:py-16">
            <div className="section-floral" />
            <div className="floral-spray floral-spray-left opacity-80" />
            <div className="floral-corner floral-corner-top-right" />
            <div className="relative z-10 max-w-3xl">
              <p className="eyebrow">Inquiries & collaborations</p>
              <h2 className="mt-5 font-display text-4xl text-ink sm:text-5xl">
                For private bookings, collaborations, and event inquiries.
              </h2>
              <p className="mt-5 text-base leading-8 text-navy/72">
                Whether you are planning a private social evening, exploring a
                partnership, or looking for the next Prosper Events invitation,
                we welcome thoughtful inquiries.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="/inquiries">Contact Prosper Events</ButtonLink>
                <ButtonLink href="mailto:theliau@prosperevents.ca" variant="secondary">
                  Email Directly
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
