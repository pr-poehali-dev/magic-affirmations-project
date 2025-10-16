import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const products = [
  {
    id: 1,
    title: "Именные Волшебные Настрои",
    description: "Персональная аффирмация с вашим именем. Короткое видео (до 60 секунд), заряженное энергией для вашей цели. Срок исполнения: до 3 рабочих дней.",
    icon: "Key",
    image: "https://cdn.poehali.dev/projects/2c167ea8-3a44-4305-882e-e63b08628fba/files/6aabadcf-77c1-4860-94f9-7da4744b0664.jpg",
    price: "2000₽",
  },
  {
    id: 2,
    title: "7 Дней к Мечте",
    description: "Ежедневные аффирмации на неделю. Получайте мотивацию каждый день в Telegram.",
    icon: "TrendingUp",
    image: "https://cdn.poehali.dev/projects/2c167ea8-3a44-4305-882e-e63b08628fba/files/2e699e1d-304a-43de-890c-4e65cbaa2230.jpg",
    price: "5000₽",
  },
  {
    id: 3,
    title: "Экспресс-Заряд Удачи",
    description: "Быстрая поддержка за 24 часа. Заряд позитивной энергии перед важным событием.",
    icon: "Zap",
    image: "https://cdn.poehali.dev/projects/2c167ea8-3a44-4305-882e-e63b08628fba/files/e01f04c1-f22b-4fc4-8ae5-a909d5d86030.jpg",
    price: "800₽",
  },
];

export default function Index() {
  const [orderDialog, setOrderDialog] = useState(false);
  const [thankYouDialog, setThankYouDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [orderForm, setOrderForm] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  const handleOrderClick = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setOrderDialog(true);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Order submitted:", { product: selectedProduct?.title, ...orderForm });
    setOrderDialog(false);
    setThankYouDialog(true);
    setOrderForm({ name: "", email: "", phone: "", details: "" });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ic3RhcnMiIHg9IjAiIHk9IjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjxjaXJjbGUgY3g9IjgwIiBjeT0iODAiIHI9IjEuNSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMTUiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSI1MCIgcj0iMSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNzdGFycykiLz48L3N2Zz4=')] opacity-40"></div>

      <div className="relative z-10">
        <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" className="text-primary" size={32} />
          </div>
        </nav>

        <section className="container mx-auto px-4 py-20 md:py-32 text-center">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
              Волшебные Настрои для Вашей Мечты
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-12 max-w-2xl mx-auto">
              Персональные видео-аффирмации с вашим именем. Мощный инструмент для достижения целей и привлечения успеха.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="Sparkles" className="mr-2" size={20} />
              Выбрать настрой
            </Button>
          </div>
        </section>

        <section id="products" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text">
            Наши Продукты
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-border/30 hover:border-primary/50 transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold">
                    {product.price}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Icon name={product.icon as any} className="text-primary" size={24} />
                    {product.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    onClick={() => handleOrderClick(product)}
                  >
                    Заказать
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <footer className="container mx-auto px-4 py-12 text-center border-t border-border/30">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Sparkles" className="text-primary" size={24} />
            <span className="text-xl font-bold gradient-text">Мистические Настрои</span>
          </div>
          <p className="text-foreground/60">© 2024 Все права защищены</p>
        </footer>
      </div>

      <Dialog open={orderDialog} onOpenChange={setOrderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon name={selectedProduct?.icon as any} className="text-primary" size={24} />
              Заказать: {selectedProduct?.title}
            </DialogTitle>
            <DialogDescription>
              Заполните форму, и мы свяжемся с вами в ближайшее время
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Ваше имя"
                value={orderForm.name}
                onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={orderForm.email}
                onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Телефон"
                value={orderForm.phone}
                onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Расскажите о своей цели или пожеланиях"
                value={orderForm.details}
                onChange={(e) => setOrderForm({ ...orderForm, details: e.target.value })}
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full">
              Отправить заказ
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={thankYouDialog} onOpenChange={setThankYouDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Icon name="CheckCircle" className="text-primary" size={32} />
              Спасибо за заказ!
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              Мы получили вашу заявку и свяжемся с вами в ближайшее время для уточнения деталей.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setThankYouDialog(false)} className="w-full">
            Закрыть
          </Button>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        .gradient-text {
          background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  );
}