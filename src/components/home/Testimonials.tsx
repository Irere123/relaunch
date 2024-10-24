import Image from "next/image";
import React from "react";

export const Testimonials: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <ul className="hidden list-none space-y-6 py-8 sm:block sm:columns-2 sm:gap-6 lg:columns-3">
        <li className="rounded-3xl transition-all hover:shadow-lg">
          <div className="relative break-inside-avoid rounded-3xl border border-gray-300 backdrop-blur-lg row-span-2 bg-gradient-to-tr from-transparent via-transparent to-[rgb(255,255,255,0.25)] bg-black">
            <img
              src="/images/card-dotted-grid-dark.png"
              alt="Dotted grid background"
              className="pointer-events-none absolute right-0 top-0"
            />
            <div className="flex h-full flex-col justify-between p-8">
              <div className="text-gray-200">
                &quot;This platform transformed how we engage with the public.
                It&lsquo;s not just a showcase—it&lsquo;s a conversation hub.
                The community feedback helped refine our concept into a more
                viable solution.&quot;
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex flex-col space-y-0.5 invert">
                  <div className="font-semibold text-gray-800">
                    Irere Emmanuel
                  </div>
                  <div className="text-sm text-gray-500">Founder, Relaunch</div>
                </div>
                <img
                  alt="Irere Emmanuel"
                  loading="lazy"
                  width="300"
                  height="300"
                  decoding="async"
                  data-nimg="1"
                  className="blur-0 h-12 w-12 rounded-full border border-gray-800"
                  src="/images/irere.png"
                />
              </div>
            </div>
          </div>
        </li>
        <li className="rounded-3xl transition-all hover:shadow-lg">
          <div className="relative break-inside-avoid rounded-3xl border border-gray-300 bg-white/20 backdrop-blur-lg">
            <div className="flex h-full flex-col justify-between p-8">
              <div className="text-gray-700">
                &quot;This platform has been a game-changer for our innovation
                team. It allows us to gather insights and refine our ideas
                faster than traditional methods, making our product development
                more agile and user-focused.&quot;
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex flex-col space-y-0.5 invert">
                  <div className="font-semibold text-gray-800">Emily Tan</div>
                  <div className="text-sm text-gray-900">Product Designer</div>
                </div>
                <Image
                  alt="Emily Tan"
                  loading="lazy"
                  width="300"
                  height="300"
                  decoding="async"
                  data-nimg="1"
                  className="blur-0 h-12 w-12 rounded-full"
                  src="/images/emily-tan.jpg"
                />
              </div>
            </div>
          </div>
        </li>
        <li className="rounded-3xl transition-all hover:shadow-lg">
          <div className="relative break-inside-avoid rounded-3xl border border-gray-300 backdrop-blur-lg row-span-2">
            <div className="flex h-full flex-col justify-between p-8">
              <div className="text-gray-800">
                &quot;Brilliant for open innovation! I&lsquo;ve seen startups
                and solo creators use this to gather insights, iterate quickly,
                and make data-driven pivots based on real-world feedback.&quot;
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex flex-col space-y-0.5 invert">
                  <div className="font-semibold text-gray-800">
                    James Wilson
                  </div>

                  <div className="text-sm text-gray-500">
                    Tech Enthusiast and Blogger
                  </div>
                </div>
                <Image
                  alt="James Wilson"
                  loading="lazy"
                  width="300"
                  height="300"
                  decoding="async"
                  data-nimg="1"
                  className="blur-0 h-12 w-12 rounded-full"
                  src="/images/james-wilson.jpg"
                />
              </div>
            </div>
          </div>
        </li>
        <li className="rounded-3xl transition-all hover:shadow-lg">
          <div className="relative break-inside-avoid rounded-3xl border border-gray-300 backdrop-blur-lg row-span-2 bg-gradient-to-tr from-transparent via-transparent to-[rgb(255,255,255,0.25)] bg-black">
            <img
              src="/images/card-dotted-grid-dark.png"
              alt="Dotted grid background"
              className="pointer-events-none absolute right-0 top-0"
            />
            <div className="flex h-full flex-col justify-between p-8">
              <div className="text-gray-200">
                &quot;Finally, a platform that truly focuses on bringing
                creators and feedback together in one space! It gave our project
                the validation and constructive criticism we needed to fine-tune
                our vision and polish our design before launching to a broader
                audience.&quot;
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex flex-col space-y-0.5 invert">
                  <div className="font-semibold text-gray-800">
                    Lukas Schmidt
                  </div>
                  <div className="text-sm text-gray-500">Product Designer</div>
                </div>
                <Image
                  alt="Lukas Schmidt"
                  loading="lazy"
                  width="300"
                  height="300"
                  decoding="async"
                  data-nimg="1"
                  className="blur-0 h-12 w-12 rounded-full border border-gray-800"
                  src="/images/lukas.png"
                />
              </div>
            </div>
          </div>
        </li>
        <li className="rounded-3xl transition-all hover:shadow-lg">
          <div className="relative break-inside-avoid rounded-3xl border border-gray-300 backdrop-blur-lg row-span-2 bg-gradient-to-tr from-transparent via-transparent to-[rgb(255,255,255,0.25)] bg-black">
            <img
              src="/images/card-dotted-grid-dark.png"
              alt="Dotted grid background"
              className="pointer-events-none absolute right-0 top-0"
            />
            <div className="flex h-full flex-col justify-between p-8">
              <div className="relative h-36">
                <img
                  src="/images/GitHub_Logo_White.png"
                  alt="Github"
                  className="absolute h-8 w-fit"
                />
              </div>
              <div className="text-gray-200">
                &quot;It&lsquo;s the perfect blend of creativity and
                collaboration. Not only can I showcase my projects, but I also
                receive genuine feedback that challenges my thinking and pushes
                me to improve my work.&quot;
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex flex-col space-y-0.5 invert">
                  <div className="font-semibold text-gray-800">
                    Rajesh Kumar
                  </div>
                  <div className="text-sm text-gray-500">
                    Open-Source Advocate
                  </div>
                </div>
                <Image
                  alt="Rajesh Kumar"
                  loading="lazy"
                  width="300"
                  height="300"
                  decoding="async"
                  data-nimg="1"
                  className="blur-0 h-12 w-12 rounded-full border border-gray-800"
                  src="/images/rajesh.jpg"
                />
              </div>
            </div>
          </div>
        </li>
        <li className="rounded-3xl transition-all hover:shadow-lg">
          <div className="relative break-inside-avoid rounded-3xl border border-gray-300 backdrop-blur-lg row-span-2 bg-gradient-to-tr from-transparent via-transparent to-[rgb(255,97,97,0.25)] bg-black">
            <img
              src="/images/card-dotted-grid-dark.png"
              alt="Dotted grid background"
              className="pointer-events-none absolute right-0 top-0"
            />
            <div className="flex h-full flex-col justify-between p-8">
              <div className="text-gray-200">
                &quot;Being able to present my work to a wider audience and
                receive targeted suggestions has been invaluable. The platform
                is easy to use and has a supportive community eager to help you
                succeed.&quot;
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div className="flex flex-col space-y-0.5 invert">
                  <div className="font-semibold text-gray-800">
                    Kwizera Aimable
                  </div>
                  <div className="text-sm text-gray-500">Software Engineer</div>
                </div>
                <img
                  alt="Kwizera Aimable"
                  loading="lazy"
                  width="300"
                  height="300"
                  decoding="async"
                  data-nimg="1"
                  className="blur-0 h-12 w-12 rounded-full border border-gray-800"
                  src="/images/dmitry.jpg"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};
