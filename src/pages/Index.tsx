import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Icon from "@/components/ui/icon";
import { useState, useEffect, useRef } from "react";

function StatsCounter({ icon, end, label, suffix = "" }: { icon: string; end: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div 
      ref={counterRef}
      className="text-center p-6 bg-card/30 backdrop-blur border border-border/30 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:scale-105"
    >
      <Icon name={icon as any} className="text-primary mx-auto mb-4" size={48} />
      <div className="text-5xl font-bold gradient-text mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-foreground/70 text-sm">{label}</div>
    </div>
  );
}

const products = [
  {
    id: 1,
    title: "Именные Волшебные Настрои",
    description: "Персональная аффирмация, заряженная энергией специально для вашей цели. Короткое видео 15-30 секунд с вашим именем.",
    icon: "Key",
    image: "https://cdn.poehali.dev/projects/2c167ea8-3a44-4305-882e-e63b08628fba/files/6aabadcf-77c1-4860-94f9-7da4744b0664.jpg",
    price: "от 1500₽",
    features: ["Персональное видео", "Заряжено энергией", "15-30 секунд"],
  },
  {
    id: 2,
    title: "7 Дней к Мечте",
    description: "Структурированная программа с ежедневными аффирмациями. Получайте мотивацию каждый день на протяжении недели.",
    icon: "TrendingUp",
    image: "https://cdn.poehali.dev/projects/2c167ea8-3a44-4305-882e-e63b08628fba/files/2e699e1d-304a-43de-890c-4e65cbaa2230.jpg",
    price: "от 5000₽",
    features: ["7 видео", "Ежедневная поддержка", "Telegram доставка"],
  },
  {
    id: 3,
    title: "Экспресс-Заряд Удачи",
    description: "Быстрая поддержка перед важным событием. Избавление от тревоги и страха, заряд позитивной энергии за 24 часа.",
    icon: "DollarSign",
    image: "https://cdn.poehali.dev/projects/2c167ea8-3a44-4305-882e-e63b08628fba/files/e01f04c1-f22b-4fc4-8ae5-a909d5d86030.jpg",
    price: "от 800₽",
    features: ["Доставка за 24ч", "Короткое видео 5-7 сек", "Экспресс-формат"],
  },
  {
    id: 4,
    title: "Кристальные Настрои",
    description: "Премиальный продукт: аффирмация + энергия выбранного кристалла. Видео + PDF-описание свойств кристалла.",
    icon: "Gem",
    image: "https://cdn.poehali.dev/projects/2c167ea8-3a44-4305-882e-e63b08628fba/files/a89c9623-450e-4072-bc94-3833052e0c27.jpg",
    price: "от 3500₽",
    features: ["Видео 15-30 сек", "PDF описание", "Эксклюзивный подход"],
  },
];

const testimonials = [
  {
    name: "Анна М.",
    text: "После курса '7 Дней к Мечте' я почувствовала невероятный прилив сил! Каждое утро начиналось с энергии и уверенности.",
    rating: 5,
  },
  {
    name: "Дмитрий К.",
    text: "Экспресс-Заряд помог мне перед важной встречей. Чувствовал себя уверенно и спокойно. Результат превзошёл ожидания!",
    rating: 5,
  },
  {
    name: "Елена С.",
    text: "Кристальные Настрои - это нечто особенное! Чувствую связь с высшими силами и ясность в мыслях.",
    rating: 5,
  },
];

export default function Index() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [orderDialog, setOrderDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleOrderClick = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setOrderDialog(true);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", { product: selectedProduct?.title, ...orderForm });
    setOrderDialog(false);
    setOrderForm({ name: "", email: "", phone: "", details: "" });
  };

  const floatingSymbols = [
    { icon: "Key", delay: "0s", left: "10%", duration: "8s" },
    { icon: "DollarSign", delay: "2s", left: "85%", duration: "10s" },
    { icon: "Gem", delay: "1s", left: "20%", duration: "12s" },
    { icon: "TrendingUp", delay: "3s", left: "75%", duration: "9s" },
    { icon: "Sparkles", delay: "1.5s", left: "50%", duration: "11s" },
    { icon: "CircleDollarSign", delay: "4s", left: "30%", duration: "13s" },
    { icon: "Crown", delay: "2.5s", left: "65%", duration: "10s" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ic3RhcnMiIHg9IjAiIHk9IjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjxjaXJjbGUgY3g9IjgwIiBjeT0iODAiIHI9IjEuNSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMTUiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSI1MCIgcj0iMSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNzdGFycykiLz48L3N2Zz4=')] opacity-40"></div>
      
      {floatingSymbols.map((symbol, index) => (
        <div
          key={index}
          className="absolute text-primary/20 pointer-events-none"
          style={{
            left: symbol.left,
            top: '100%',
            animation: `float-up ${symbol.duration} ease-in-out infinite`,
            animationDelay: symbol.delay,
          }}
        >
          <Icon name={symbol.icon as any} size={40} />
        </div>
      ))}

      <div className="relative z-10">
        <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" className="text-primary" size={32} />
            <span className="text-2xl font-bold gradient-text">Мистические Настрои</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#products" className="text-foreground/80 hover:text-foreground transition-colors">Продукты</a>
            <a href="#testimonials" className="text-foreground/80 hover:text-foreground transition-colors">Отзывы</a>
            <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">Контакты</a>
          </div>
        </nav>

        <section className="container mx-auto px-4 py-20 md:py-32 text-center relative">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text animate-in fade-in duration-700">
              Волшебные Настрои для Вашей Мечты
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-12 animate-in fade-in duration-700" style={{ animationDelay: '200ms' }}>
              Персональные аффирмации, заряженные энергией кристаллов. Измените свою жизнь через силу слова и магии.
            </p>
            <Button size="lg" className="text-lg px-8 py-6 animate-in fade-in duration-700 hover:scale-105 transition-transform" style={{ animationDelay: '400ms' }}>
              <Icon name="Sparkles" className="mr-2" size={20} />
              Начать путь к мечте
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StatsCounter 
              icon="Users" 
              end={2847} 
              label="Довольных клиентов" 
              suffix="+"
            />
            <StatsCounter 
              icon="Video" 
              end={15420} 
              label="Созданных настроев" 
              suffix="+"
            />
            <StatsCounter 
              icon="Star" 
              end={98} 
              label="Довольных отзывов" 
              suffix="%"
            />
          </div>
        </section>

        <section id="products" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Наши Продукты
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] overflow-hidden group animate-in fade-in duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold">
                    {product.price}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Icon name={product.icon as any} className="text-primary" size={28} />
                    {product.title}
                  </CardTitle>
                  <CardDescription className="text-base text-foreground/70">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                        <Icon name="Check" className="text-primary" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full hover:scale-105 transition-transform"
                    onClick={() => handleOrderClick(product)}
                  >
                    Заказать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="testimonials" className="container mx-auto px-4 py-20 bg-card/30 backdrop-blur">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Отзывы клиентов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] animate-in fade-in duration-700"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Icon key={i} name="Star" className="text-accent fill-accent" size={16} />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Частые вопросы
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card/30 backdrop-blur border border-border/30 rounded-xl px-6 data-[state=open]:border-primary/50 transition-all">
                <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon name="HelpCircle" className="text-primary" size={24} />
                    Как работают волшебные настрои?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pt-2">
                  Волшебные настрои — это персонализированные аффирмации, заряженные энергией кристаллов и созданные специально для вашей цели. Мы используем силу слова, визуализации и энергетических практик для создания мощных установок. Каждое видео создаётся индивидуально с вашим именем и запросом.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card/30 backdrop-blur border border-border/30 rounded-xl px-6 data-[state=open]:border-primary/50 transition-all">
                <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" className="text-primary" size={24} />
                    Как быстро я получу свой настрой?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pt-2">
                  Экспресс-Заряд Удачи доставляется в течение 24 часов. Именные Волшебные Настрои и Кристальные Настрои создаются 2-3 дня, так как требуют более глубокой проработки. Программа "7 Дней к Мечте" стартует в удобное для вас время.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card/30 backdrop-blur border border-border/30 rounded-xl px-6 data-[state=open]:border-primary/50 transition-all">
                <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon name="Gem" className="text-primary" size={24} />
                    Что такое Кристальные Настрои?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pt-2">
                  Это премиальный продукт, который сочетает силу аффирмации и энергию выбранного кристалла. Мы подбираем кристалл в соответствии с вашей целью: аметист для духовного роста, цитрин для процветания, розовый кварц для любви. Вы получаете видео + PDF с описанием свойств кристалла.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card/30 backdrop-blur border border-border/30 rounded-xl px-6 data-[state=open]:border-primary/50 transition-all">
                <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon name="CreditCard" className="text-primary" size={24} />
                    Какие способы оплаты?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pt-2">
                  Мы принимаем банковские карты, электронные кошельки и переводы по СБП. После оформления заказа вы получите инструкции по оплате. Все платежи проходят через защищённые каналы.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card/30 backdrop-blur border border-border/30 rounded-xl px-6 data-[state=open]:border-primary/50 transition-all">
                <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon name="Shield" className="text-primary" size={24} />
                    Есть ли гарантия результата?
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 pt-2">
                  Мы гарантируем качество нашей работы и индивидуальный подход к каждому клиенту. 98% наших клиентов отмечают позитивные изменения. Важно понимать, что результат зависит от вашей вовлечённости и регулярности практики.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section id="contact" className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text">
              Свяжитесь с нами
            </h2>
            <p className="text-center text-foreground/70 mb-12 text-lg">
              Готовы начать путь к своей мечте? Напишите нам, и мы подберём идеальный настрой для вас.
            </p>
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Имя</label>
                    <Input
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Сообщение</label>
                    <Textarea
                      placeholder="Расскажите о своей мечте или вопросе..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-background/50 min-h-32"
                    />
                  </div>
                  <Button type="submit" className="w-full hover:scale-105 transition-transform">
                    <Icon name="Send" className="mr-2" size={18} />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <footer className="container mx-auto px-4 py-12 border-t border-border/30 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Sparkles" className="text-primary" size={24} />
            <span className="text-xl font-bold gradient-text">Мистические Настрои</span>
          </div>
          <p className="text-foreground/60">
            © 2024 Все права защищены. Создано с магией и любовью ✨
          </p>
        </footer>
      </div>

      <Dialog open={orderDialog} onOpenChange={setOrderDialog}>
        <DialogContent className="bg-card border-border/50 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Icon name={selectedProduct?.icon as any} className="text-primary" size={24} />
              {selectedProduct?.title}
            </DialogTitle>
            <DialogDescription className="text-base">
              {selectedProduct?.description}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleOrderSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-2">Ваше имя</label>
              <Input
                placeholder="Иван Иванов"
                value={orderForm.name}
                onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                required
                className="bg-background/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="ivan@example.com"
                value={orderForm.email}
                onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                required
                className="bg-background/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Телефон</label>
              <Input
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={orderForm.phone}
                onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                required
                className="bg-background/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Детали заказа</label>
              <Textarea
                placeholder="Расскажите о вашей цели или мечте..."
                value={orderForm.details}
                onChange={(e) => setOrderForm({ ...orderForm, details: e.target.value })}
                className="bg-background/50 min-h-24"
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-2xl font-bold text-primary">{selectedProduct?.price}</span>
              <Button type="submit" className="hover:scale-105 transition-transform">
                <Icon name="ShoppingCart" className="mr-2" size={18} />
                Оформить заказ
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}