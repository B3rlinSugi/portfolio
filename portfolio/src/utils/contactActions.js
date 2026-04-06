const DEFAULT_EMAIL_SUBJECT = "Interview Opportunity - Junior Backend Developer";
const DEFAULT_EMAIL_BODY = [
  "Halo Berlin,",
  "",
  "Saya tertarik membahas peluang kerja Junior Backend Developer bersama Anda.",
  "Apakah Anda tersedia untuk interview minggu ini?",
  "",
  "Terima kasih.",
].join("\n");
const DEFAULT_WHATSAPP_MESSAGE =
  "Halo Berlin, saya tertarik dengan profil backend kamu. Boleh lanjut diskusi peluang kerja?";

const cleanUrl = (value) => String(value || "").trim();

export const buildMailtoLink = ({ email, subject, body }) => {
  const recipient = cleanUrl(email);
  if (!recipient) return "";

  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return query ? `mailto:${recipient}?${query}` : `mailto:${recipient}`;
};

export const buildWhatsAppLink = ({ whatsapp, message }) => {
  const base = cleanUrl(whatsapp);
  const text = cleanUrl(message);

  if (!base && !text) return "";
  if (!base) return `https://wa.me/?text=${encodeURIComponent(text)}`;

  const rawBase = base.split("?")[0];
  const connector = rawBase.includes("?") ? "&" : "?";
  if (!text) return rawBase;
  return `${rawBase}${connector}text=${encodeURIComponent(text)}`;
};

export const getContactActionLinks = (profile = {}) => {
  const templates = profile?.contactTemplates || {};
  const emailSubject = templates.emailSubject || DEFAULT_EMAIL_SUBJECT;
  const emailBody = templates.emailBody || DEFAULT_EMAIL_BODY;
  const whatsappMessage = templates.whatsappMessage || DEFAULT_WHATSAPP_MESSAGE;

  return {
    whatsapp: buildWhatsAppLink({
      whatsapp: profile?.whatsapp,
      message: whatsappMessage,
    }),
    email: buildMailtoLink({
      email: profile?.email,
      subject: emailSubject,
      body: emailBody,
    }),
    linkedin: cleanUrl(profile?.linkedin),
    github: cleanUrl(profile?.github),
    instagram: cleanUrl(profile?.instagram),
    cv: "/cv.pdf",
  };
};

