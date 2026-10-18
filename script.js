function changeLanguage(lang) {
    // ڕێکخستنی ئاڕاستەی زمانەکە (ڕاست بۆ چەپ یان چەپ بۆ ڕاست)
    if (lang === 'en' || lang === 'ru') {
        document.documentElement.setAttribute('dir', 'ltr');
    } else {
        document.documentElement.setAttribute('dir', 'rtl');
    }
    
    // زمانەکەی ناو تاگی html ش دەگۆڕێت
    document.documentElement.setAttribute('lang', lang);
    
    // گۆڕینی هەموو ئەو دەقانەی data-i18n یان هەیە
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}
const categoryNames = {
  life: "پەندی ژیانی",
  love: "پەندی خۆشەویستی",
  family: "پەندی دایک و باوک",
  friendship: "پەندی هاوڕێیەتی",
  wisdom: "پەندی دانایی و ئەزموون",
  society: "پەندی کۆمەڵایەتی"
};

const seedQuotes = [
  {id:"p1", category:"life", sorani:"هەنگاوی بچووکیش ئەگەر بەردەوام بێت، دەگاتە مەبەست.", badini:"Gavên biçûk jî, heke berdewam bin, digihîjin armancê."},
  {id:"p2", category:"life", sorani:"ژیان کتێبێکە؛ هەر ڕۆژێک لاپەڕەیەکی نوێیە.", badini:"Jiyan pirtûkek e; her roj rûpelek nû ye."},
  {id:"p3", category:"life", sorani:"ئەوەی لە هەڵەکانی فێر دەبێت، هەرگیز بە تەواوی دۆڕاو نییە.", badini:"Yê ji xeletiyên xwe fêr dibe, qet bi tevahî winda nake."},
  {id:"p4", category:"love", sorani:"خۆشەویستی بە قسە ناسراو نییە، بە کردار دەردەکەوێت.", badini:"Evîn bi gotinan nayê naskirin, bi kirinan tê dîtin."},
  {id:"p5", category:"love", sorani:"دڵی پاک، جوانترین دیارییە کە دەتوانیت پێشکەشی بکەیت.", badini:"Dilê paqij xweştirîn diyariya ku dikarî pêşkêş bikî ye."},
  {id:"p6", category:"family", sorani:"ڕەزامەندی دایک و باوک، گەنجینەیەکی گەورەی ژیانە.", badini:"Razîbûna dê û bav, xezîneyeke mezin a jiyanê ye."},
  {id:"p7", category:"family", sorani:"ماڵ بە دیوار دروست دەبێت، بە خۆشەویستی دەبێتە خێزان.", badini:"Mal bi dîwaran tê avakirin, bi evînê dibe malbat."},
  {id:"p8", category:"friendship", sorani:"هاوڕێی ڕاستەقینە لە کاتی تەنگانەدا دەناسرێتەوە.", badini:"Hevalê rastîn di dema tengasiyê de tê nasîn."},
  {id:"p9", category:"friendship", sorani:"هاوڕێی باش ئەوەیە کە ڕاستی پێت بڵێت، نەک تەنها ئەوەی دەتەوێت بیبیستیت.", badini:"Hevalê baş ew e ku rastiyê ji te re bêje, ne tenê ya ku dixwazî bibihîzî."},
  {id:"p10", category:"wisdom", sorani:"پێش ئەوەی وەڵام بدەیتەوە، گوێ بگرە؛ پێش ئەوەی بڕیار بدەیت، بیر بکەرەوە.", badini:"Berî ku bersiv bidî, guhdarî bike; berî biryarê, bifikire."},
  {id:"p11", category:"wisdom", sorani:"ئەزموون مامۆستایەکی گرانبەهایە، بەڵام وانەکانی بە نرخێک فێر دەکات.", badini:"Tecrûbe mamosteyeke biha ye, lê dersên xwe bi buhayekê hîn dike."},
  {id:"p12", category:"wisdom", sorani:"دانایی لە زانینی زۆر نییە، لە بەکارهێنانی دروستی زانیارییە.", badini:"Şehrezayî ne tenê zaniyîna gelek e, lê bikaranîna rast a zanînê ye."},
  {id:"p13", category:"society", sorani:"دەستی یەکگرتوو کاری گەورە تەواو دەکات.", badini:"Destên yekgirtî karên mezin temam dikin."},
  {id:"p14", category:"society", sorani:"ئەگەر چاکە بکەیت، چاکە لە ڕێگایەکی ترەوە بۆت دەگەڕێتەوە.", badini:"Heke qenciyê bikî, qencî ji rêyekê din vedigere te."},
  {id:"p15", category:"life", sorani:"هیوا چرایەکە لە تاریکترین کاتەکاندا ڕێگات نیشان دەدات.", badini:"Hêvî çirayek e ku di demên herî tarî de rê nîşanî te dide."},
  {id:"p16", category:"wisdom", sorani:"بە هێواشی و بەردەوامی، دوورترین ڕێگا دەبڕدرێت.", badini:"Bi hêdî û berdewamî, rêya herî dûr tê derbas kirin."},
  {id:"p17", category:"friendship", sorani:"هاوڕێیەتی بە ژمارە ناپێورێت، بە دڵسۆزی دەپێورێت.", badini:"Hevaltî bi hejmarê nayê pîvan, bi dilsozî tê pîvan."},
  {id:"p18", category:"family", sorani:"دەنگی دایک، ئارامی دڵە؛ دڵسۆزی باوک، پشتیوانی ژیانە.", badini:"Dengê dayikê aramiya dil e; dilsoziya bav piştgiriya jiyanê ye."}
];

// ===== Supabase =====
const SUPABASE_URL = "https://yteookagtvmrsljsuwtp.supabase.co";
const SUPABASE_KEY = "sb_publishable_N7YHR1NwdW4UxpGATyqIGw_ky_r3Sf-"; // sb_publishable_...
const db = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const STORAGE = {favorites:"kaniPandFavorites", custom:"kaniPandCustom", theme:"kaniPandTheme", language:"kaniPandLanguage"};
let customQuotes = readStorage(STORAGE.custom, []);
let favorites = readStorage(STORAGE.favorites, []);
let quotes = [...seedQuotes, ...customQuotes];
let language = localStorage.getItem(STORAGE.language) || "sorani";
let currentCategory = "all";
let toastTimer;

async function loadCommunityQuotes() {
  if (!db) return;
  const { data, error } = await db.from("proverbs")
    .select("id, category, sorani, badini")
    .eq("approved", true)
    .order("created_at", { ascending: true });
  if (error) { console.error(error); return; }
  quotes = [...seedQuotes, ...customQuotes, ...data];
  renderQuotes();
}

const $ = (selector) => document.querySelector(selector);
const quoteGrid = $("#quoteGrid");
const favoritesList = $("#favoritesList");

function readStorage(key, fallback) {
  try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; }
  catch { return fallback; }
}
function saveStorage(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function getQuoteText(quote) {
  if (language === "badini") return quote.badini || quote.sorani;
  return quote.sorani;
}
function toKurdishNumber(number) {
  return String(number).replace(/\d/g, digit => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]);
}
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}
function categoryLabel(category) { return categoryNames[category] || "پەندی کوردی"; }

function renderQuotes() {
  const query = $("#searchInput").value.trim().toLocaleLowerCase();
  const filtered = quotes.filter(quote => {
    const matchesCategory = currentCategory === "all" || quote.category === currentCategory;
    const searchable = `${quote.sorani} ${quote.badini || ""} ${categoryLabel(quote.category)}`.toLocaleLowerCase();
    return matchesCategory && searchable.includes(query);
  });
  quoteGrid.innerHTML = filtered.map(quote => {
    const isFav = favorites.includes(quote.id);
    return `<article class="quote-card">
      <div class="quote-top"><span class="category-label">${escapeHTML(categoryLabel(quote.category))}</span>
      <button class="favorite-btn ${isFav ? "is-favorite" : ""}" data-action="favorite" data-id="${escapeHTML(quote.id)}" aria-label="${isFav ? "لابردن لە دڵخوازەکان" : "زیادکردن بۆ دڵخوازەکان"}" title="دڵخواز"> ${isFav ? "♥" : "♡"} </button></div>
      <p class="quote-text">${escapeHTML(getQuoteText(quote))}</p>
      <div class="quote-actions">
        <button class="small-action" data-action="copy" data-id="${escapeHTML(quote.id)}">📋 کۆپی</button>
        <button class="small-action" data-action="share" data-id="${escapeHTML(quote.id)}">📤 هاوبەشی</button>
      </div>
    </article>`;
  }).join("");
  $("#emptyState").classList.toggle("hidden", filtered.length !== 0);
  $("#totalCount").textContent = toKurdishNumber(quotes.length);
  $("#listHeading").textContent = currentCategory === "all" ? "پەندەکان" : categoryLabel(currentCategory);
  renderFavorites();
}
function renderFavorites() {
  const favQuotes = quotes.filter(quote => favorites.includes(quote.id));
  $("#favoriteCount").textContent = `${toKurdishNumber(favQuotes.length)} پەند`;
  if (!favQuotes.length) {
    favoritesList.innerHTML = '<p class="muted-note">هێشتا پەندێکت دڵخواز نەکردووە. لەسەر ♡ کلیک بکە بۆ زیادکردنی پەندێک.</p>';
    return;
  }
  favoritesList.innerHTML = favQuotes.map(quote => `<div class="favorite-row">
    <p>${escapeHTML(getQuoteText(quote))}</p>
    <button data-action="copy" data-id="${escapeHTML(quote.id)}" aria-label="کۆپی پەند" title="کۆپی">▢</button>
    <button data-action="favorite" data-id="${escapeHTML(quote.id)}" aria-label="لابردن لە دڵخوازەکان" title="لابردن">♥</button>
  </div>`).join("");
}
function renderDailyQuote() {
  // پەندی ڕۆژ بە بەرواری ناوخۆی ئامێر هەڵدەبژێردرێت، بۆیە لە هەمان ڕۆژدا ناگۆڕێت.
  const today = new Date();
  const dateKey = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
  const index = Math.abs([...dateKey].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % seedQuotes.length;
  const quote = seedQuotes[index];
  $("#dailyQuote").textContent = getQuoteText(quote);
  $("#dailyCategory").textContent = categoryLabel(quote.category);
  $("#dailyCopyBtn").dataset.id = quote.id;
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function findQuote(id) { return quotes.find(quote => quote.id === id); }
async function copyQuote(quote) {
  if (!quote) return;
  const text = getQuoteText(quote);
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
    else {
      const area = document.createElement("textarea");
      area.value = text; area.style.position = "fixed"; area.style.opacity = "0";
      document.body.appendChild(area); area.select();
      const copied = document.execCommand("copy"); area.remove();
      if (!copied) throw new Error("copy failed");
    }
    showToast("پەندەکە کۆپی کرا ✅");
  } catch {
    showToast("کۆپیکردن لەم وێبگەڕەدا بەردەست نییە؛ دەقەکە دەستنووس بکە.");
  }
}
async function shareQuote(quote) {
  if (!quote) return;
  const text = `${getQuoteText(quote)}\n\n— کانی پەند`;
  if (navigator.share) {
    try { await navigator.share({title:"کانی پەند", text}); }
    catch (error) { if (error.name !== "AbortError") showToast("هاوبەشکردن سەرکەوتوو نەبوو."); }
  } else {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
      else throw new Error("clipboard unavailable");
      showToast("دەقی پەندەکە کۆپی کرا؛ دەتوانیت بینێریت.");
    } catch { showToast("ئەم وێبگەڕە هاوبەشکردن پشتگیری ناکات."); }
  }
}
function toggleFavorite(id) {
  favorites = favorites.includes(id) ? favorites.filter(favId => favId !== id) : [...favorites, id];
  saveStorage(STORAGE.favorites, favorites);
  renderQuotes();
  showToast(favorites.includes(id) ? "پەندەکە خرایە دڵخوازەکان ❤️" : "پەندەکە لە دڵخوازەکان لابرا");
}
function setCategory(category) {
  currentCategory = category;
  $("#categorySelect").value = category;
  document.querySelectorAll(".chip").forEach(chip => chip.classList.toggle("active", chip.dataset.category === category));
  renderQuotes();
}
function randomQuote() {
  let pool = quotes.filter(quote => currentCategory === "all" || quote.category === currentCategory);
  if (!pool.length) pool = quotes;
  const quote = pool[Math.floor(Math.random() * pool.length)];
  if (!quote) return;
  $("#searchInput").value = "";
  renderQuotes();
  const card = [...quoteGrid.querySelectorAll(".quote-card")].find(el => el.querySelector(".quote-text")?.textContent === getQuoteText(quote));
  if (card) {
    card.scrollIntoView({behavior:"smooth", block:"center"});
    card.animate([{transform:"scale(1)"},{transform:"scale(1.025)"},{transform:"scale(1)"}], {duration:450});
  }
  showToast(`پەندی هەڕەمەکی: ${getQuoteText(quote)}`);
}
function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  $("#themeBtn").textContent = theme === "dark" ? "☀️" : "🌙";
  $("#themeBtn").title = theme === "dark" ? "گۆڕین بۆ ڕووناک" : "گۆڕین بۆ تاریک";
  localStorage.setItem(STORAGE.theme, theme);
}
function toggleLanguage() {
  language = language === "sorani" ? "badini" : "sorani";
  localStorage.setItem(STORAGE.language, language);
  $("#languageBtn").textContent = language === "sorani" ? "سۆرانی ▾" : "بادینی ▾";
  renderQuotes();
  renderDailyQuote();
loadCommunityQuotes();
  showToast(language === "sorani" ? "زاراوە: سۆرانی" : "Ziman: Badînî");
}

quoteGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const quote = findQuote(button.dataset.id);
  if (button.dataset.action === "favorite") toggleFavorite(button.dataset.id);
  if (button.dataset.action === "copy") copyQuote(quote);
  if (button.dataset.action === "share") shareQuote(quote);
});
favoritesList.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  if (button.dataset.action === "favorite") toggleFavorite(button.dataset.id);
  if (button.dataset.action === "copy") copyQuote(findQuote(button.dataset.id));
});
$("#dailyCopyBtn").addEventListener("click", () => copyQuote(findQuote($("#dailyCopyBtn").dataset.id)));
$("#randomBtn").addEventListener("click", randomQuote);
$("#themeBtn").addEventListener("click", () => applyTheme(document.body.classList.contains("dark") ? "light" : "dark"));
$("#languageBtn").addEventListener("click", toggleLanguage);
$("#searchInput").addEventListener("input", renderQuotes);
$("#categorySelect").addEventListener("change", event => setCategory(event.target.value));
document.querySelectorAll(".chip").forEach(chip => chip.addEventListener("click", () => setCategory(chip.dataset.category)));

$("#addQuoteForm").addEventListener("submit", async event => {
  event.preventDefault();
  const sorani = $("#newQuoteSorani").value.trim();
  const badini = $("#newQuoteBadini").value.trim();
  const category = $("#newQuoteCategory").value;
  if (!sorani) return;
  const btn = event.target.querySelector(".submit-btn");
  btn.disabled = true;
  const { error } = await db.from("proverbs").insert({ category, sorani, badini: badini || null });
  btn.disabled = false;
  if (error) {
    console.error(error);
    $("#formMessage").textContent = "نەتوانرا بنێردرێت. دووبارە هەوڵ بدەرەوە.";
    showToast("هەڵەیەک ڕوویدا ❌");
    return;
  }
  $("#addQuoteForm").reset();
  $("#formMessage").textContent = "سوپاس! پەندەکەت نێردرا و دوای پشکنین دەردەکەوێت 🌿";
  showToast("پەندەکە نێردرا بۆ پشکنین ✅");
});
applyTheme(localStorage.getItem(STORAGE.theme) || "light");
$("#languageBtn").textContent = language === "sorani" ? "سۆرانی ▾" : "بادینی ▾";
renderQuotes();
renderDailyQuote();
loadCommunityQuotes();
function changeLanguage(lang) {
    // ڕێکخستنی ئاڕاستەی زمانەکە (ڕاست بۆ چەپ یان چەپ بۆ ڕاست)
    if (lang === 'en' || lang === 'ru') {
        document.documentElement.setAttribute('dir', 'ltr');
    } else {
        document.documentElement.setAttribute('dir', 'rtl');
    }
    
    // زمانەکەی ناو تاگی html ش دەگۆڕێت
    document.documentElement.setAttribute('lang', lang);
    
    // گۆڕینی هەموو ئەو دەقانەی data-i18n یان هەیە
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}
