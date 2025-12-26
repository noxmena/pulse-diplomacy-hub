import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, User, Mail, Phone, GraduationCap, MapPin } from "lucide-react";

const JoinForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    governorate: "",
    education: "",
    experience: "",
    motivation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "تم إرسال طلبك بنجاح! ✓",
      description: "سيتم التواصل معك قريباً",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      governorate: "",
      education: "",
      experience: "",
      motivation: "",
    });
    setIsSubmitting(false);
  };

  return (
    <section id="join" className="py-24 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gradient-gold mb-4">
            انضم إلينا
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            كن جزءاً من أول كيان شبابي متخصص في الدبلوماسية الشبابية في مصر
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-gradient-card border border-border/50 rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                الاسم الكامل
              </label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="أدخل اسمك الكامل"
                required
                className="bg-secondary/50 border-border/50 focus:border-primary"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                البريد الإلكتروني
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className="bg-secondary/50 border-border/50 focus:border-primary"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                رقم الهاتف
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01xxxxxxxxx"
                required
                className="bg-secondary/50 border-border/50 focus:border-primary"
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                العمر
              </label>
              <Input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="مثال: 22"
                required
                min="16"
                max="40"
                className="bg-secondary/50 border-border/50 focus:border-primary"
              />
            </div>

            {/* Governorate */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                المحافظة
              </label>
              <Input
                name="governorate"
                value={formData.governorate}
                onChange={handleChange}
                placeholder="مثال: القاهرة"
                required
                className="bg-secondary/50 border-border/50 focus:border-primary"
              />
            </div>

            {/* Education */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                المؤهل الدراسي
              </label>
              <Input
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="مثال: بكالوريوس علوم سياسية"
                required
                className="bg-secondary/50 border-border/50 focus:border-primary"
              />
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-2 mt-6">
            <label className="text-sm font-medium text-foreground">
              خبراتك التطوعية السابقة (إن وجدت)
            </label>
            <Textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="اذكر أي خبرات تطوعية أو قيادية سابقة..."
              rows={3}
              className="bg-secondary/50 border-border/50 focus:border-primary resize-none"
            />
          </div>

          {/* Motivation */}
          <div className="space-y-2 mt-6">
            <label className="text-sm font-medium text-foreground">
              لماذا تريد الانضمام للجبهة؟
            </label>
            <Textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              placeholder="شاركنا دوافعك وأهدافك..."
              required
              rows={4}
              className="bg-secondary/50 border-border/50 focus:border-primary resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <Button
              type="submit"
              variant="gold"
              size="xl"
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  جاري الإرسال...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  إرسال الطلب
                </span>
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default JoinForm;
