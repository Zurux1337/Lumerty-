"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarHeart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Menu,
  Pause,
  Play,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const photos = {
  haircut: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=600&q=80",
  coloring: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80",
  manicure: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
  makeup: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=600&q=80",
  facial: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
};

const services = [
  { title: "Стрижка и укладка", cat: "Волосы", price: "от 1 800 ₽", duration: "60 мин", image: photos.haircut, text: "Консультация, мытьё, точный срез и укладка под твой тип волос." },
  { title: "Окрашивание", cat: "Волосы", price: "от 6 500 ₽", duration: "3 часа", image: photos.coloring, text: "AirTouch, балаяж, однотон. Уход в подарок к каждому окрашиванию." },
  { title: "Маникюр + покрытие", cat: "Ногти", price: "от 2 200 ₽", duration: "90 мин", image: photos.manicure, text: "Идеальный блик, аккуратная кутикула и дизайн по желанию." },
  { title: "Вечерний макияж", cat: "Макияж", price: "от 3 500 ₽", duration: "60 мин", image: photos.makeup, text: "Стойкий образ для события: сияющая кожа и твой акцент." },
  { title: "Уход за лицом", cat: "Лицо", price: "от 4 000 ₽", duration: "75 мин", image: photos.facial, text: "Чистка, пилинг или увлажнение — программу подберём под кожу." },
  { title: "Брови и ресницы", cat: "Лицо", price: "от 1 500 ₽", duration: "45 мин", image: photos.makeup, text: "Коррекция, окрашивание, ламинирование. Взгляд с характером." },
];

const masters = [
  { name: "Анна", role: "топ-стилист", exp: "9 лет · 4.9", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80" },
  { name: "Мария", role: "колорист", exp: "7 лет · 5.0", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80" },
  { name: "София", role: "nail-мастер", exp: "6 лет · 4.9", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
  { name: "Елена", role: "визажист-косметолог", exp: "8 лет · 5.0", photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80" },
];

const testimonials = [
  { name: "Ольга", meta: "окрашивание", text: "Оттенок — ровно с референса. Цвет держится второй месяц, уход объяснили подробно.", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
  { name: "Дарья", meta: "маникюр", text: "Три недели без сколов, дизайн как на эскизе. Следующий визит забронировала сразу.", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80" },
  { name: "Ирина", meta: "уход за лицом", text: "Кожа как после отпуска. Никакого навязывания — только честные рекомендации.", photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=200&q=80" },
  { name: "Алина", meta: "макияж", text: "Макияж пережил свадьбу: слёзы, танцы и жару. Приду ещё.", photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80" },
  { name: "Вероника", meta: "стрижка", text: "Убрали длину ровно настолько, насколько просила. Укладка держалась три дня.", photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80" },
  { name: "Наталья", meta: "брови и ресницы", text: "Естественно и симметрично. Удобно, что напомнили о визите заранее.", photo: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=200&q=80" },
];

const faqs: [string, string][] = [
  ["Первый визит — как всё пройдёт?", "Встретим, уточним пожелания, покажем референсы. Стоимость и время фиксируем до начала. Оплата после услуги."],
  ["Можно отменить или перенести?", "Да, бесплатно за 12 часов — напишем в мессенджер или позвоним. При отмене день в день удерживается 30%."],
  ["На какой косметике работаете?", "Wella, Lebel, Luxio, Atelier. Трёхэтапная стерилизация инструментов. При аллергии подберём гипоаллергенную альтернативу."],
  ["Можно с ребёнком или питомцем?", "Да, есть детская зона, зал дог-френдли. Предупреди при записи — посадим у окна, там просторнее."],
];

const timeSlots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];

function Brand() {
  return (
    <a href="#home" className="brand" aria-label="Lumerty — на главную">
      <span className="brand-mark" aria-hidden="true"><Sparkles size={16} /></span>
      Lumerty
    </a>
  );
}

function SkiperLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="skiper-link">
      {children}
      <svg fill="none" viewBox="0 0 10 10" aria-hidden="true">
        <path d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

function Stars() {
  return (
    <span className="stars" role="img" aria-label="Оценка 4.9 из 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" />
      ))}
    </span>
  );
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);
  const [cat, setCat] = useState("Все услуги");

  const [service, setService] = useState(services[1].title);
  const [master, setMaster] = useState("Любой мастер");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(timeSlots[3]);
  const [sms, setSms] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [summary, setSummary] = useState("");

  const [slide, setSlide] = useState(0);
  const [visible, setVisible] = useState(1);
  const [paused, setPaused] = useState(false);
  const maxSlide = Math.max(0, testimonials.length - visible);

  useEffect(() => {
    const mq = () => {
      const v = window.innerWidth >= 1100 ? 3 : window.innerWidth >= 800 ? 2 : 1;
      setVisible(v);
      // Кламп слайда здесь (обработчик события, не тело эффекта),
      // чтобы не нарушать react-hooks/set-state-in-effect
      setSlide((s) => Math.min(s, Math.max(0, testimonials.length - v)));
    };
    mq();
    window.addEventListener("resize", mq);
    return () => window.removeEventListener("resize", mq);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = window.setInterval(() => {
      setSlide((s) => (s >= testimonials.length - visible ? 0 : s + 1));
    }, 4500);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, visible]);

  useEffect(() => {
    if (reducedMotion) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -100 } });
    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(el, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
    }, root);
    return () => { ctx.revert(); gsap.ticker.remove(update); lenis.destroy(); };
  }, [reducedMotion]);

  function chooseService(title: string) {
    setService(title);
    setStatus("idle");
    document.getElementById("booking")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    const form = e.currentTarget;
    if (!form.checkValidity()) { setStatus("error"); return; }
    window.setTimeout(() => {
      const name = (form.elements.namedItem("name") as HTMLInputElement)?.value ?? "";
      setSummary(`${service} · ${master} · ${date || "ближайшая дата"} в ${time} · гость: ${name}${sms ? " · напомним по SMS" : ""}`);
      setStatus("success");
    }, 900);
  }

  const today = new Date().toISOString().slice(0, 10);
  const shift = 100 / visible;
  const cats = ["Все услуги", "Волосы", "Ногти", "Лицо", "Макияж"];
  const shown = services.filter((s) => cat === "Все услуги" || s.cat === cat);

  return (
    <div ref={root}>
      <a className="skip-link" href="#booking">Перейти к записи</a>

      <header className="nav-wrap">
        <nav className="floating-nav" aria-label="Основная навигация">
          <Brand />
          <div className="nav-links">
            <SkiperLink href="#services">Услуги</SkiperLink>
            <SkiperLink href="#masters">Мастера</SkiperLink>
            <SkiperLink href="#reviews">Отзывы</SkiperLink>
            <SkiperLink href="#faq">Вопросы</SkiperLink>
          </div>
          <div className="nav-actions">
            <Button size="sm" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" })}>
              Записаться <ArrowUpRight size={15} />
            </Button>
            <button className="menu-toggle" aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={mobileOpen} aria-controls="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div id="mobile-menu" className="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              {[["#services", "Услуги"], ["#masters", "Мастера"], ["#reviews", "Отзывы"], ["#faq", "Вопросы"], ["#booking", "Записаться"]].map(([href, label]) => (
                <a key={href} href={href} onClick={() => setMobileOpen(false)}>{label}</a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero — centered editorial stack */}
        <section className="hero container" id="home">
          <div className="hero-inner">
            {/* Обычный h1 без entrance-анимации: motion initial расходится
                между SSR и клиентом (useReducedMotion неизвестен на сервере)
                и даёт hydration-mismatch. Hero и так в первом экране. */}
            <h1 className="display">
              Красота — <em>это про тебя.</em> Запись за минуту
            </h1>
            <p className="hero-sub">Тёплый салон на кремовой улице города: стрижки, цвет, ногти и уход. Выбирай время — остальное берём на себя.</p>
            <div className="hero-cta-row">
              <Button size="lg" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" })}>
                <CalendarHeart /> Записаться онлайн
              </Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" })}>
                Смотреть услуги
              </Button>
            </div>
            <div className="hero-note"><Stars /><span><strong>4.9</strong> · 1 200+ отзывов · сегодня свободно с 14:30</span></div>
            <div className="tile-fan" aria-hidden="true">
              {[photos.haircut, photos.coloring, photos.manicure, photos.makeup, photos.facial].map((src, i) => (
                <span className="tile" key={i}>
                  <Image src={src} alt="" fill sizes="170px" />
                  <span>{["Волосы", "Цвет", "Ногти", "Макияж", "Уход"][i]}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Black category bar */}
        <div className="catbar" role="group" aria-label="Категории услуг">
          <div className="catbar-inner">
            {cats.map((c) => (
              <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
            <span style={{ marginLeft: "auto", color: "#848383" }}>ежедневно 10:00–21:00</span>
          </div>
        </div>

        {/* Services */}
        <section className="section container" id="services">
          <div className="reveal" style={{ textAlign: "center", display: "grid", justifyItems: "center", gap: 14 }}>
            <span className="eyebrow"><i /> Услуги и цены</span>
            <h2>Один смелый выбор <span className="thin">за раз.</span></h2>
            <p className="muted" style={{ maxWidth: 520 }}>Нажми на стрелку — услуга подставится в форму записи ниже. Цены честные, время точное.</p>
          </div>
          <div className="service-grid">
            {shown.map((s, i) => (
              <article className="service-card reveal" key={s.title}>
                <div className="service-image">
                  <Image src={s.image} alt={s.title} fill sizes="(max-width: 700px) 100vw, 33vw" />
                  <span className="service-price">{s.price}</span>
                  <span className="service-duration"><Clock3 size={14} />{s.duration}</span>
                </div>
                <div className="service-body">
                  <span className="eyebrow" style={{ fontSize: 12 }}>0{i + 1} · Lumière</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <div className="service-meta">
                    <span style={{ fontSize: 12, color: "var(--color-stone)" }}>без предоплаты</span>
                    <button className="circle-button" aria-label={`Записаться: ${s.title}`} onClick={() => chooseService(s.title)}>
                      <ArrowUpRight size={19} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Gradient wash + masters */}
        <section className="wash" id="masters">
          <div className="container">
            <div className="reveal" style={{ display: "grid", justifyItems: "center", gap: 12 }}>
              <span className="eyebrow"><i /> Мастера</span>
              <h2>Опиши желание. <em style={{ color: "var(--color-hot-magenta)" }}>Оно твоё через час.</em></h2>
              <p>Сертифицированные мастера, обучение каждый год, сотни постоянных гостей.</p>
            </div>
            <div className="masters-row">
              {masters.map((m) => (
                <article className="master-card reveal" key={m.name}>
                  <div className="master-photo"><Image src={m.photo} alt={`Мастер ${m.name}`} fill sizes="280px" /></div>
                  <h3>{m.name}</h3>
                  <span>{m.role}</span>
                  <p>{m.exp}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="section container" id="reviews">
          <div className="testimonials-head reveal">
            <span className="eyebrow"><i /> Отзывы</span>
            <h2>Гости говорят <span className="thin">громче рекламы.</span></h2>
            <p className="muted">Листайте стрелками или точками. Пауза — при наведении.</p>
          </div>
          <div
            className="carousel-shell reveal"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="carousel-viewport">
              <div className="carousel-track" style={{ transform: `translateX(-${slide * shift}%)` }}>
                {testimonials.map((t) => (
                  <div className="carousel-slide" key={t.name}>
                    <article className="review-card">
                      <div className="review-head">
                        <span className="review-avatar"><Image src={t.photo} alt="" fill sizes="60px" /></span>
                        <div><strong>{t.name}</strong><small>{t.meta}</small></div>
                      </div>
                      <Stars />
                      <blockquote>«{t.text}»</blockquote>
                      <span className="verified"><BadgeCheck size={15} /> Проверенный визит</span>
                    </article>
                  </div>
                ))}
              </div>
            </div>
            <div className="carousel-controls">
              <div className="carousel-dots" role="tablist" aria-label="Выбор отзыва">
                {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                  <button key={i} role="tab" aria-selected={slide === i} aria-current={slide === i} aria-label={`Отзыв ${i + 1} из ${maxSlide + 1}`} onClick={() => setSlide(i)} />
                ))}
              </div>
              <span className="carousel-live" aria-live="polite">Слайд {slide + 1} из {maxSlide + 1}</span>
              <div className="carousel-nav">
                <button aria-label={paused ? "Продолжить" : "Пауза"} aria-pressed={paused} onClick={() => setPaused(!paused)}>
                  {paused ? <Play size={16} /> : <Pause size={16} />} {paused ? "плей" : "пауза"}
                </button>
                <button aria-label="Назад" onClick={() => setSlide((s) => (s <= 0 ? maxSlide : s - 1))}><ChevronLeft size={18} /></button>
                <button aria-label="Вперёд" onClick={() => setSlide((s) => (s >= maxSlide ? 0 : s + 1))}><ChevronRight size={18} /></button>
              </div>
            </div>
          </div>
        </section>

        {/* Booking */}
        <section className="section container" id="booking" style={{ paddingTop: 20 }}>
          <div className="booking-layout">
            <div className="reveal">
              <span className="eyebrow"><i /> Онлайн-запись</span>
              <h2>Твоё окно <span className="thin">уже ждёт.</span></h2>
              <p className="muted" style={{ marginTop: 14, maxWidth: 440 }}>Выбери услугу, мастера и время — подтвердим в течение 10 минут. Демо-форма: данные никуда не отправляются.</p>
              <ul className="booking-steps">
                <li><span className="step-num">1</span><div><strong>Услуга и мастер</strong><p className="muted" style={{ fontSize: 13 }}>Можно «любой» — подберём лучшего.</p></div></li>
                <li><span className="step-num">2</span><div><strong>Дата и время</strong><p className="muted" style={{ fontSize: 13 }}>Держим окно 15 минут.</p></div></li>
                <li><span className="step-num">3</span><div><strong>Подтверждение</strong><p className="muted" style={{ fontSize: 13 }}>SMS + напоминание за день.</p></div></li>
              </ul>
            </div>
            <div className="booking-card reveal">
              <span className="eyebrow">Запись за 1 минуту</span>
              <h3>Забронировать визит</h3>
              {status === "success" ? (
                <div role="status" aria-live="polite" style={{ display: "grid", gap: 16, marginTop: 18 }}>
                  <span className="form-status success"><strong>Готово!</strong> {summary}.</span>
                  <p className="muted" style={{ fontSize: 13 }}>Демо-режим: ничего не отправлено. Для боя подключим CRM и SMS.</p>
                  <Button variant="outline" onClick={() => setStatus("idle")}>Новая запись</Button>
                </div>
              ) : (
                <form className="booking-form" onSubmit={handleSubmit}>
                  <div>
                    <span id="service-label" style={{ fontSize: 13, fontWeight: 600 }}>Услуга</span>
                    <div className="service-chips" role="group" aria-labelledby="service-label" style={{ marginTop: 8 }}>
                      {services.map((s) => (
                        <button key={s.title} type="button" aria-pressed={service === s.title} onClick={() => setService(s.title)}>{s.title}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <label>Мастер
                      <select value={master} onChange={(e) => setMaster(e.target.value)}>
                        <option>Любой мастер</option>
                        {masters.map((m) => <option key={m.name} value={m.name}>{m.name} — {m.role}</option>)}
                      </select>
                    </label>
                    <label>Время
                      <select value={time} onChange={(e) => setTime(e.target.value)}>
                        {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </label>
                  </div>
                  <label>Дата
                    <input type="date" required min={today} value={date} onChange={(e) => setDate(e.target.value)} />
                  </label>
                  <label>Как вас зовут?
                    <input name="name" placeholder="Ваше имя" autoComplete="given-name" required minLength={2} maxLength={80} />
                  </label>
                  <label>Телефон
                    <input name="phone" type="tel" placeholder="+7 (___) ___-__-__" autoComplete="tel" required pattern="[+0-9()\s\-]{10,20}" title="Телефон: 10–20 символов" />
                  </label>
                  <div className="toggle-row">
                    <span id="sms-label">Напомнить по SMS за день</span>
                    <button type="button" role="switch" aria-checked={sms} aria-labelledby="sms-label" className="toggle" onClick={() => setSms(!sms)} />
                  </div>
                  <label className="consent-row"><input type="checkbox" required /><span>Согласна(ен) на обработку данных. Понимаю, что это демо.</span></label>
                  {status === "error" && <p className="form-status error" role="alert">Проверь форму: все поля должны быть заполнены.</p>}
                  {status === "loading" && <p className="form-status loading" role="status" aria-live="polite">Проверяем окно…</p>}
                  <Button type="submit" size="lg" disabled={status === "loading"}>
                    {status === "loading" ? "Записываем…" : <>Записаться · {service} <Scissors size={16} /></>}
                  </Button>
                  <p className="muted" style={{ fontSize: 12, textAlign: "center", display: "flex", gap: 6, justifyContent: "center", alignItems: "center" }}><ShieldCheck size={14} /> Без предоплаты · отмена за 12 часов</p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQ two-column */}
        <section className="section container faq-section" id="faq" style={{ paddingTop: 20 }}>
          <div className="reveal">
            <span className="eyebrow"><i /> Got questions?</span>
            <h2>Things people <span className="thin">want to know.</span></h2>
            <p className="muted" style={{ marginTop: 14 }}>Не нашла ответ? Позвони — подскажем за минуту.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a], i) => (
              <div className="faq-item reveal" key={q}>
                <h3>
                  <button aria-expanded={faq === i} aria-controls={`answer-${i}`} id={`question-${i}`} onClick={() => setFaq(faq === i ? null : i)}>
                    {q}
                    <span className={faq === i ? "faq-icon expanded" : "faq-icon"}><ChevronDown size={18} /></span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {faq === i && (
                    <motion.div id={`answer-${i}`} role="region" aria-labelledby={`question-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }} className="faq-answer">
                      <p>{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="closing container reveal">
          <span className="app-mark"><Sparkles size={24} /></span>
          <h2>Побалуй себя <br />уже на этой неделе.</h2>
          <p>Первый визит −15% по промокоду PLAYFUL. Перезвоним за 10 минут.</p>
          <Button size="lg" onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" })}>
            Выбрать время <ArrowUpRight />
          </Button>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div><Brand /><p className="muted" style={{ fontSize: 13, marginTop: 12 }}>Тёплый салон · забота с 2016 года.</p></div>
            <nav className="footer-links" aria-label="Навигация в подвале">
              <SkiperLink href="#services">Услуги и цены</SkiperLink>
              <SkiperLink href="#masters">Мастера</SkiperLink>
              <SkiperLink href="#reviews">Отзывы</SkiperLink>
              <SkiperLink href="#faq">Вопросы</SkiperLink>
              <SkiperLink href="#booking">Запись</SkiperLink>
              <SkiperLink href="#home">Наверх</SkiperLink>
            </nav>
            <div><span className="eyebrow" style={{ fontSize: 11 }}>Ждём в гости</span><p style={{ fontSize: 13, marginTop: 10 }}>ул. Цветочная, 12 · 10:00–21:00<br />+7 (495) 123-45-67</p></div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Lumière Playful.</span>
            <span>Демо-сайт · цены — примеры · дизайн: Playful ref</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
