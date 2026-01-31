import { useState } from "react";
import { motion } from "framer-motion";

const FAQData = [
  {
    question: "¿PlayJS es completamente gratis?",
    answer:
      "Sí, PlayJS es totalmente gratuito y siempre lo será. No necesitas registrarte ni pagar nada. Puedes empezar a escribir código, probar y aprender al instante sin limitaciones.",
  },
  {
    question: "¿Qué navegadores soporta PlayJS?",
    answer:
      "PlayJS funciona en todos los navegadores modernos (Chrome, Firefox, Safari, Edge). Solo necesitas tener JavaScript habilitado en tu navegador. Funciona tanto en desktop como en dispositivos móviles.",
  },
  {
    question: "¿Puedo compartir mi código con otros?",
    answer:
      "Sí, PlayJS codifica automáticamente tu código en la URL. Solo copia el enlace del navegador y comparte. Cualquiera podrá ver tu código y ejecutarlo sin instalar nada.",
  },
  {
    question: "¿Cómo reporto un bug o sugiero una característica?",
    answer:
      "Puedes abrir un issue en nuestro repositorio de GitHub (salteadorneo/PlayJS), contactarnos por email o usar el formulario de contacto en la web. Valoramos toda retroalimentación de la comunidad.",
  },
];

export const FAQ = () => (
  <section className="relative -mt-8 sm:mt-0 pt-12 sm:pt-16 pb-16 bg-blueGray-50 overflow-hidden">
    <div className="absolute -top-10" id="FAQ" />
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative z-10 container px-2 sm:px-8 lg:px-4 mx-auto w-11/12 sm:w-full">
        <div className="md:max-w-4xl mx-auto">
          <p className="mb-7 block-subtitle text-center">¿Tienes preguntas?</p>
          <h2 className="mb-16 block-big-title text-center">
            Preguntas Frecuentes
          </h2>
          <div className="mb-11 flex flex-wrap -m-1">
            {FAQData.map((item, index) => (
              <div className="w-full p-1" key={`${item.question}-${index}`}>
                <FAQBox
                  title={item.question}
                  content={item.answer}
                  key={`${item.question}-${item.answer}`}
                  defaultOpen={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const FAQBox = ({ defaultOpen, title, content }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className="pt-2 sm:pt-6 pb-2 px-3 sm:px-8  rounded-3xl bg-bgDark3 main-border-gray-darker mb-4 relative hover:bg-bgDark3Hover cursor-pointer transition"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-col p-2  justify-center items-start">
        <h3 className=" content-title pt-3 sm:pt-0 pr-8 sm:pr-0">{title}</h3>
        <p
          className={`text-secondaryText pt-4 transition-height duration-300 overflow-hidden ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          {content}
        </p>
      </div>
      <div className="absolute top-6 right-4 sm:top-8 sm:right-8">
        <svg
          width="28px"
          height="30px"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-500  ${
            isOpen ? "rotate-[180deg]" : "rotate-[270deg]"
          }`}
        >
          <path
            d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
            stroke="#4F46E5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </div>
  );
};
