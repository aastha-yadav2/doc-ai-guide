import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, AlertCircle, CheckCircle2, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";

const Vaccines = () => {
  const { t } = useTranslation();
  const [reminderSet, setReminderSet] = useState<string[]>([]);

  const vaccineSchedule = [
    {
      age: "Birth",
      ageHindi: "जन्म के समय",
      vaccines: [
        { name: "BCG (Bacillus Calmette-Guérin)", nameHindi: "बीसीजी", description: "Protects against tuberculosis" },
        { name: "Hepatitis B", nameHindi: "हेपेटाइटिस बी", description: "First dose to prevent Hepatitis B" }
      ]
    },
    {
      age: "6 Weeks",
      ageHindi: "6 सप्ताह",
      vaccines: [
        { name: "DTwP/DTaP", nameHindi: "डीटीडब्ल्यूपी/डीटीएपी", description: "Diphtheria, Tetanus, Pertussis" },
        { name: "Hepatitis B", nameHindi: "हेपेटाइटिस बी", description: "Second dose" },
        { name: "Hib", nameHindi: "हिब", description: "Haemophilus Influenzae Type B" },
        { name: "Rotavirus", nameHindi: "रोटावायरस", description: "Prevents rotavirus infection" },
        { name: "PCV", nameHindi: "पीसीवी", description: "Pneumococcal Conjugate Vaccine" },
        { name: "IPV", nameHindi: "आईपीवी", description: "Inactivated Polio Vaccine" }
      ]
    },
    {
      age: "10 Weeks",
      ageHindi: "10 सप्ताह",
      vaccines: [
        { name: "DTwP/DTaP", nameHindi: "डीटीडब्ल्यूपी/डीटीएपी", description: "2nd dose" },
        { name: "Hib", nameHindi: "हिब", description: "2nd dose" },
        { name: "Rotavirus", nameHindi: "रोटावायरस", description: "2nd dose" },
        { name: "PCV", nameHindi: "पीसीवी", description: "2nd dose" },
        { name: "IPV", nameHindi: "आईपीवी", description: "2nd dose" }
      ]
    },
    {
      age: "14 Weeks",
      ageHindi: "14 सप्ताह",
      vaccines: [
        { name: "DTwP/DTaP", nameHindi: "डीटीडब्ल्यूपी/डीटीएपी", description: "3rd dose" },
        { name: "Hib", nameHindi: "हिब", description: "3rd dose" },
        { name: "Rotavirus", nameHindi: "रोटावायरस", description: "3rd dose" },
        { name: "PCV", nameHindi: "पीसीवी", description: "3rd dose" },
        { name: "IPV", nameHindi: "आईपीवी", description: "3rd dose" }
      ]
    },
    {
      age: "9 Months",
      ageHindi: "9 महीने",
      vaccines: [
        { name: "MMR", nameHindi: "एमएमआर", description: "Measles, Mumps, Rubella" },
        { name: "Hepatitis A", nameHindi: "हेपेटाइटिस ए", description: "Prevents Hepatitis A" },
        { name: "Typhoid conjugate vaccine", nameHindi: "टाइफाइड संयुग्मित वैक्सीन", description: "Protects against typhoid fever" }
      ]
    },
    {
      age: "10 Years",
      ageHindi: "10 साल",
      vaccines: [
        { name: "Tdap", nameHindi: "टीडैप", description: "Tetanus, Diphtheria, Pertussis Booster" },
        { name: "HPV (for girls)", nameHindi: "एचपीवी (लड़कियों के लिए)", description: "Human Papillomavirus Vaccine" }
      ]
    }
  ];

  const toggleReminder = (vaccineId: string) => {
    setReminderSet(prev => 
      prev.includes(vaccineId) 
        ? prev.filter(id => id !== vaccineId)
        : [...prev, vaccineId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t("Vaccination Schedule")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("Complete vaccination schedule for babies and children according to Indian guidelines")}
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 border-orange-200 bg-orange-50 dark:bg-orange-950/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-orange-800 dark:text-orange-200">
                {t("Important Notice")}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-orange-700 dark:text-orange-300">
              {t("Always consult with your pediatrician before vaccinations. This schedule follows Indian Academy of Pediatrics guidelines. Visit your nearest government health center for free vaccinations under UIP.")}
            </p>
            <Button 
              variant="outline" 
              className="mt-3 border-orange-300 text-orange-700 hover:bg-orange-100"
              onClick={() => window.open("tel:104")}
            >
              <Phone className="h-4 w-4 mr-2" />
              {t("Call National Health Helpline: 104")}
            </Button>
          </CardContent>
        </Card>

        {/* Tabs for different views */}
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="schedule">{t("Age-wise Schedule")}</TabsTrigger>
            <TabsTrigger value="tracker">{t("Vaccination Tracker")}</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-6">
            {vaccineSchedule.map((ageGroup, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-primary">
                        {t("language") === "hi" ? ageGroup.ageHindi : ageGroup.age}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {ageGroup.vaccines.length} {t("vaccines required")}
                      </CardDescription>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {ageGroup.vaccines.map((vaccine, vIndex) => {
                      const vaccineId = `${index}-${vIndex}`;
                      const hasReminder = reminderSet.includes(vaccineId);
                      
                      return (
                        <div 
                          key={vIndex}
                          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-foreground">
                              {t("language") === "hi" ? vaccine.nameHindi : vaccine.name}
                            </h4>
                            <Badge variant="outline" className="ml-2">
                              {t("Required")}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {vaccine.description}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant={hasReminder ? "default" : "outline"}
                              onClick={() => toggleReminder(vaccineId)}
                              className="flex-1"
                            >
                              {hasReminder ? (
                                <>
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  {t("Reminder Set")}
                                </>
                              ) : (
                                <>
                                  <Clock className="h-3 w-3 mr-1" />
                                  {t("Set Reminder")}
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tracker" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("Vaccination Tracker")}</CardTitle>
                <CardDescription>
                  {t("Track your child's vaccination progress")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vaccineSchedule.map((ageGroup, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">
                          {t("language") === "hi" ? ageGroup.ageHindi : ageGroup.age}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {ageGroup.vaccines.length} {t("vaccines")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {t("Pending")}
                        </Badge>
                        <Button size="sm" variant="outline">
                          {t("Mark Complete")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{t("Additional Resources")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="font-medium">{t("Find Vaccination Centers")}</div>
                  <div className="text-sm text-muted-foreground">{t("Locate nearby government health centers")}</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="font-medium">{t("Download Vaccination Card")}</div>
                  <div className="text-sm text-muted-foreground">{t("Digital vaccination record")}</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Vaccines;