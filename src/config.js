// ❗ SECURITY & ARCHITECTURE NOTE
// - Media URLs MUST come from Cloudflare Worker
// - Do NOT change MEDIA_CONFIG structure or IDs
// - Do NOT introduce local assets for these memories

export const MEDIA_BASE_URL = "https://birthday-media-proxy.tyagisaksham576.workers.dev/media?id=";

export const MEDIA_CONFIG = {
  photos: [
    "nPT7h","OA3M1","Sr5rZ","1-XoX","d76NA","n_JoR","j_oFK","sVJST",
    "0_lCi","BcaUk","0hyT0","BAH91","C09ul","sFWO5","orYRR","Upsj-",
    "5CCu5","FZL1L","Q6ZPf","tCmmR","3ZDTs","fNqF-","jSdkv","JbSpG",
    "TF406","Ug_0U","FyxfT","X6ngS","hSsRV","JZfA0","p1KFE","8iV1n",
    "HZKXM","xAY-D","cOV31","kuAqb","W5gay"
  ],
  videos: [
    "FnY03","i3zgH","z7ixn","k8STW","c74Qn","j-1E4","p7gsq"
  ]
};

// Target date: January 11, 2026
export const TARGET_DATE = new Date("2026-01-11T00:00:00");
