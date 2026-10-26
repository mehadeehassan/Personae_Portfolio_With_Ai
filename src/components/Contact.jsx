import data from "@/data/portfolio.json";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@/components/icons";

export default function Contact() {
  const { contact } = data;
  const hasWhatsapp = Boolean(contact.whatsapp);

  const channels = [
    {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: MailIcon,
    },
    {
      label: "Phone",
      value: contact.phoneDisplay,
      href: `tel:${contact.phone}`,
      icon: PhoneIcon,
    },
    ...(hasWhatsapp
      ? [
          {
            label: "WhatsApp",
            value: contact.phoneDisplay,
            href: `https://wa.me/${contact.whatsapp}`,
            icon: WhatsAppIcon,
          },
        ]
      : []),
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="aurora aurora-b h-[400px] w-[400px] -bottom-32 left-1/2 -translate-x-1/2" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Ready to <span className="text-gradient">build together?</span>
            </>
          }
          description="Whether it is a full-time role, a freelance project, or just a question about the web — my inbox is always open. I usually reply within a day."
        />

        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:has-[:nth-child(3)]:grid-cols-3">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 110}>
              <a
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="card card-hover flex h-full flex-col items-center gap-3 p-6 text-center sm:p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand text-white shadow-lg">
                  <channel.icon size={20} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {channel.label}
                </span>
                <span className="break-all text-sm font-semibold sm:text-[15px]">
                  {channel.value}
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-accent">
                  Reach out
                  <ArrowRightIcon size={13} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 flex items-center justify-center gap-2 text-sm text-muted">
            <MapPinIcon size={16} className="text-accent" />
            {contact.address}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
