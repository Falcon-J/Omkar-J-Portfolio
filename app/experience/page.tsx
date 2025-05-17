import { PageWrapper } from "@/components/page-wrapper"
import { FadeIn } from "@/components/fade-in"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExperiencePage() {
  return (
    <PageWrapper>
      
      <div className="fixed inset-0 -z-10">
        <div className="skill-grid h-full w-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="skill-dot"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <h1 className="text-4xl font-bold mb-16 text-center text-[var(--color-secondary)]">Experience</h1>
          </FadeIn>

          <Tabs defaultValue="professional" className="w-full">
            <FadeIn delay={0.2}>
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                <TabsTrigger
                  value="professional"
                  className="data-[state=active]:bg-navy data-[state=active]:text-cream"
                >
                  Professional
                </TabsTrigger>
                <TabsTrigger
                  value="extracurricular"
                  className="data-[state=active]:bg-navy data-[state=active]:text-cream"
                >
                  Extracurricular
                </TabsTrigger>
              </TabsList>
            </FadeIn>

            <TabsContent value="professional" className="space-y-8">
              <FadeIn delay={0.3}>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-beige ml-6 md:ml-8"></div>
                  <div className="space-y-12">
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 bg-navy rounded-full flex items-center justify-center text-cream font-bold z-10">
                        <span>2024</span>
                      </div>
                      <div className="pl-16 md:pl-24">
                        <Card className="border-beige hover:shadow-md transition-all duration-300">
                          <CardHeader>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                              <div>
                                <CardTitle className="text-navy">Director of Operations</CardTitle>
                                <CardDescription>Entrepreneurship Cell, VIT</CardDescription>
                              </div>
                              <div className="text-sm text-navy/70">July 2024 - Present</div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-navy/80">
                              <li className="flex gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-5 w-5 text-navy flex-shrink-0"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>
                                  Driving operational strategy to scale the Entrepreneurship Cell, VIT, optimizing
                                  workflows and maximizing impact.
                                </span>
                              </li>
                              <li className="flex gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-5 w-5 text-navy flex-shrink-0"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>
                                  Mentoring a dynamic team, cultivating an entrepreneurial mindset for innovation and
                                  high-impact execution.
                                </span>
                              </li>
                              <li className="flex gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-5 w-5 text-navy flex-shrink-0"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>
                                  Optimized decision-making, increasing event efficiency and resource allocation by 30%.
                                </span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 bg-navy rounded-full flex items-center justify-center text-cream font-bold z-10">
                        <span>2023</span>
                      </div>
                      <div className="pl-16 md:pl-24">
                        <Card className="border-beige hover:shadow-md transition-all duration-300">
                          <CardHeader>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                              <div>
                                <CardTitle className="text-navy">Event Coordinator - Volunteer</CardTitle>
                                <CardDescription>ICETITE'24</CardDescription>
                              </div>
                              <div className="text-sm text-navy/70">June 2023 - March 2024</div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-navy/80">
                              <li className="flex gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-5 w-5 text-navy flex-shrink-0"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>
                                  Led the planning and execution of TECHNEXT, a prominent event at the ic-ETITE'24
                                  Conference.
                                </span>
                              </li>
                              <li className="flex gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-5 w-5 text-navy flex-shrink-0"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>
                                  Implemented digital marketing campaigns on Instagram and Twitter, increasing event
                                  registrations by 40%.
                                </span>
                              </li>
                              <li className="flex gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-5 w-5 text-navy flex-shrink-0"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>
                                  Collaborated with India's leading venture capitalists and startup innovators to mentor
                                  students, helping them convert technology concepts into practical solutions.
                                </span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </TabsContent>

            <TabsContent value="extracurricular" className="space-y-8">
              <FadeIn delay={0.3}>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-beige ml-6 md:ml-8"></div>
                  <div className="space-y-12">
                    <div className="relative">
                      <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 bg-navy rounded-full flex items-center justify-center text-cream font-bold z-10">
                        <span>2023</span>
                      </div>
                      <div className="pl-16 md:pl-24">
                        <Card className="border-beige hover:shadow-md transition-all duration-300">
                          <CardHeader>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                              <div>
                                <CardTitle className="text-navy">Core Committee</CardTitle>
                                <CardDescription>Entrepreneurship Cell, VIT</CardDescription>
                              </div>
                              <div className="text-sm text-navy/70">February 2023 - July 2024</div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-navy/80">
                              <li className="flex gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-5 w-5 text-navy flex-shrink-0"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>
                                  Managed cross-functional coordination across 8 departments and 77 core members to
                                  organize flagship events.
                                </span>
                              </li>
                              <li className="flex gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-5 w-5 text-navy flex-shrink-0"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>
                                  Led operational planning, ensuring timely execution of tasks, fostering collaboration,
                                  and driving organizational growth.
                                </span>
                              </li>
                              <li className="flex gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-5 w-5 text-navy flex-shrink-0"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>
                                  Developed targeted engagement strategies, boosting member participation by 40% and
                                  enhancing overall community involvement.
                                </span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 bg-navy rounded-full flex items-center justify-center text-cream font-bold z-10">
                        <span>2024</span>
                      </div>
                      <div className="pl-16 md:pl-24">
                        <Card className="border-beige hover:shadow-md transition-all duration-300">
                          <CardHeader>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                              <div>
                                <CardTitle className="text-navy">Organizing Committee - Volunteer</CardTitle>
                                <CardDescription>AGAAZ 7.0</CardDescription>
                              </div>
                              <div className="text-sm text-navy/70">February 2024</div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm text-navy/80">
                              <li className="flex gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-5 w-5 text-navy flex-shrink-0"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>
                                  Spearheaded the organization of Riviera's largest comedy show, collaborating with 4
                                  renowned Indian performers.
                                </span>
                              </li>
                              <li className="flex gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-5 w-5 text-navy flex-shrink-0"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                <span>
                                  Facilitated a seamless experience for 1000+ attendees, ensuring smooth event execution
                                  and high audience engagement.
                                </span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </PageWrapper>
  )
}
