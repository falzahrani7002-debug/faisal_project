import React, { useContext } from 'react';
import { AppContext } from '../App';
import { Page } from '../types';
import { translations } from '../data';
import Section from './Section';
import {
  UserIcon, EducationIcon, SparklesIcon, HeartIcon, FlagIcon, RocketIcon,
  GalleryIcon, ProjectIcon, StarIcon, CheckIcon, TargetIcon,
  FootballIcon, CalculatorIcon, BookIcon, PuzzleIcon, CodeIcon, ChessIcon
} from './Icons';
import SkillBar from './SkillBar';
import Timeline from './Timeline';
import Gallery from './Gallery';
import GuessTheAchievementGame from './GuessTheAchievementGame';

const MainContent: React.FC<{ page: Page }> = ({ page }) => {
  const context = useContext(AppContext);
  if (!context) return null;
  const { lang, data } = context;

  const renderContent = () => {
    switch (page) {
      case 'about':
        return (
          <Section title={translations.nav.about[lang]} icon={<UserIcon />}>
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-start rtl:md:text-right">
              <img src="https://picsum.photos/seed/student-reading/200/200" alt={data.studentInfo.name} className="w-48 h-48 rounded-full border-4 border-amber-500 object-cover shadow-lg" />
              <div className="flex-1">
                <h2 className="text-4xl font-black text-amber-500">{data.studentInfo.name}</h2>
                <p className="text-xl text-amber-300 mt-1">{data.studentInfo.grade[lang]} @ {data.studentInfo.school}</p>
                <p className="mt-4 text-lg text-amber-200 leading-relaxed">{data.studentInfo.about[lang]}</p>
              </div>
            </div>
          </Section>
        );

      case 'education':
        return (
          <Section title={translations.nav.education[lang]} icon={<EducationIcon />}>
            <Timeline items={data.education.map(item => ({
              id: item.id,
              title: item.degree[lang],
              subtitle: item.institution[lang],
              period: item.years
            }))} />
          </Section>
        );

      case 'skills':
        return (
          <Section title={translations.nav.skills[lang]} icon={<SparklesIcon />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.skills.map(skill => <SkillBar key={skill.id} name={skill.name[lang]} level={skill.level} />)}
            </div>
          </Section>
        );
      
      case 'volunteer':
        return (
          <Section title={translations.nav.volunteer[lang]} icon={<HeartIcon />}>
             <Timeline items={data.volunteerWork.map(item => ({
              id: item.id,
              title: item.role[lang],
              subtitle: item.organization[lang],
              period: item.years,
              description: item.description[lang]
            }))} />
          </Section>
        );
      
      case 'hobbies':
        return (
          <Section title={translations.nav.hobbies[lang]} icon={<FlagIcon />}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
              {data.hobbies.map(hobby => (
                <div key={hobby.id} className="bg-teal-800 p-6 rounded-lg border border-teal-700 hover:border-amber-500 hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto text-amber-500">
                    {hobby.icon === 'football' && <FootballIcon />}
                    {hobby.icon === 'calculator' && <CalculatorIcon />}
                    {hobby.icon === 'book' && <BookIcon />}
                    {hobby.icon === 'code' && <CodeIcon />}
                    {hobby.icon === 'chess' && <ChessIcon />}
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{hobby.name[lang]}</h3>
                </div>
              ))}
            </div>
          </Section>
        );
      
      case 'goals':
        return (
          <Section title={translations.nav.goals[lang]} icon={<RocketIcon />}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-bold text-amber-500 mb-4 flex items-center gap-2">
                  <TargetIcon /> {translations.shortTermGoals[lang]}
                </h3>
                <ul className="space-y-3">
                  {data.goals.shortTerm.map(goal => (
                    <li key={goal.id} className="flex items-start gap-3 p-3 bg-teal-800 rounded-md">
                      <CheckIcon className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                      <span>{goal.text[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-500 mb-4 flex items-center gap-2">
                  <TargetIcon /> {translations.longTermGoals[lang]}
                </h3>
                <ul className="space-y-3">
                  {data.goals.longTerm.map(goal => (
                    <li key={goal.id} className="flex items-start gap-3 p-3 bg-teal-800 rounded-md">
                      <CheckIcon className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                      <span>{goal.text[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        );
      
      case 'gallery':
        return (
          <Section title={translations.nav.gallery[lang]} icon={<GalleryIcon />}>
            <Gallery />
          </Section>
        );

      case 'project':
        const project = data.featuredProject;
        return (
          <Section title={translations.nav.project[lang]} icon={<ProjectIcon />}>
            <div className="bg-teal-800 rounded-lg overflow-hidden shadow-lg border border-teal-700">
              <img src={project.imageUrl} alt={project.title[lang]} className="w-full h-64 md:h-96 object-cover" />
              <div className="p-8">
                <h2 className="text-4xl font-black text-amber-500 mb-2">{project.title[lang]}</h2>
                <p className="text-lg text-amber-300 mb-6">{project.description[lang]}</p>
                <div className="prose prose-invert max-w-none text-amber-200">
                  {project.details[lang]}
                </div>
              </div>
            </div>
          </Section>
        );

      case 'evaluations':
        return (
          <Section title={translations.nav.evaluations[lang]} icon={<StarIcon />}>
            <div className="space-y-8">
              {data.evaluations.map(evalItem => (
                <blockquote key={evalItem.id} className="bg-teal-800 p-6 rounded-lg border-l-4 border-amber-500 rtl:border-l-0 rtl:border-r-4">
                  <p className="text-lg italic text-amber-200">"{evalItem.comment[lang]}"</p>
                  <footer className="mt-4">
                    <p className="font-bold text-white">{evalItem.author}</p>
                    <p className="text-sm text-amber-300">{evalItem.role[lang]}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </Section>
        );
        
      case 'game':
        return (
          <Section title={translations.nav.game[lang]} icon={<PuzzleIcon />}>
            <GuessTheAchievementGame />
          </Section>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return <div className="container mx-auto">{renderContent()}</div>;
};

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <section className="mb-16 animate-fade-in">
    <div className="flex items-center gap-4 mb-8">
      <div className="text-amber-500 w-10 h-10">{icon}</div>
      <h2 className="text-3xl md:text-4xl font-black text-white border-b-2 border-amber-500 pb-2">{title}</h2>
    </div>
    {children}
  </section>
);


const SkillBar: React.FC<{ name: string, level: number }> = ({ name, level }) => (
  <div className="w-full">
    <div className="flex justify-between mb-1">
      <span className="text-base font-medium text-amber-300">{name}</span>
      <span className="text-sm font-medium text-amber-500">{level}%</span>
    </div>
    <div className="w-full bg-teal-700 rounded-full h-4">
      <div className="bg-amber-500 h-4 rounded-full" style={{ width: `${level}%` }}></div>
    </div>
  </div>
);

const Timeline: React.FC<{ items: { id: string; title: string; subtitle: string; period: string; description?: string }[] }> = ({ items }) => (
  <div className="relative border-l-2 border-amber-500 rtl:border-l-0 rtl:border-r-2 ml-4 rtl:ml-0 rtl:mr-4 space-y-12">
    {items.map((item, index) => (
      <div key={item.id} className="pl-8 rtl:pl-0 rtl:pr-8 relative">
        <div className="absolute -left-2.5 rtl:-left-auto rtl:-right-2.5 top-1 w-5 h-5 bg-teal-900 border-2 border-amber-500 rounded-full"></div>
        <time className="mb-1 text-sm font-normal leading-none text-amber-300">{item.period}</time>
        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        <h4 className="text-md font-medium text-amber-300">{item.subtitle}</h4>
        {item.description && <p className="mt-2 text-base font-normal text-amber-200">{item.description}</p>}
      </div>
    ))}
  </div>
);

export default MainContent;