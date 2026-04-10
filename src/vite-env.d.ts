/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SELLER_WHATSAPP_NUMBER?: string;
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
