import { motion } from "framer-motion";

const examples = [
  {
    title: "Aprende interactivamente",
    description: "Escribe código JavaScript/TypeScript y ve los resultados en tiempo real",
    code: "const greeting = (name) => `¡Hola ${name}!`\ngreeting('PlayJS')",
    hash: "Y29uc3QgZ3JlZXRpbmcgPSAobmFtZSkgPT4gYCHCoiFIb2xhICR7bmFtZX0hYFxyXG5ncmVldGluZygnUGxheUpTJyk="
  },
  {
    title: "Testing integrado",
    description: "Usa helpers como expect() y cases() para verificar tu código",
    code: "const sum = (a, b) => a + b\ncases(sum, [[1,2,3], [5,5,10], [0,0,0]])",
    hash: "Y29uc3Qgc3VtID0gKGEsIGIpID0+IGEgKyBiCmNhc2VzKHN1bSwgW1sxLDIsM10sIFs1LDUsMTBdLCBbMCwwLDBdXSk="
  },
  {
    title: "Async sin complicaciones",
    description: "Maneja promesas, fetch y código asincrónico nativamente",
    code: "const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')\n  .then(r => r.json())\ndata",
    hash: "Y29uc3QgZGF0YSA9IGF3YWl0IGZldGNoKCdodHRwczovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20vdG9kb3MvMScpCiAgLnRoZW4ociA9PiByLmpzb24oKSkKZGF0YQ=="
  },
  {
    title: "Comparte tu código",
    description: "Genera URLs con tu código codificado para compartir fácilmente",
    code: "// Tu código aquí\nconst idea = 'Cambia esto y comparte el enlace'",
    hash: "Ly8gVHUgY8OzZGlnbyBhcXXDrQpjb25zdCBpZGVhID0gJ0NhbWJpYSBlc3RvIHkgY29tcGFydGUgZWwgZW5sYWNlJw=="
  }
];

export const PlayJSExamples = () => {
  return (
    <section className="w-full bg-bgDark2 py-24">
      <div className="flex flex-wrap items-center 2xl:w-[1450px] xl:w-[1300px] w-11/12 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full text-center mb-16"
        >
          <span className="block-subtitle">Ejemplos interactivos</span>
          <h2 className="mt-6 mb-8 text-4xl lg:text-5xl block-big-title">
            Prueba PlayJS en acción
          </h2>
          <p className="text-secondaryText text-lg max-w-2xl mx-auto">
            Cada sección es un editor JavaScript/TypeScript funcional. Modifica el código y ve los resultados al instante.
          </p>
        </motion.div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {examples.map((example, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-bgDark1 rounded-lg p-6 border border-gray-700 hover:border-secondaryColor transition-colors"
            >
              <h3 className="text-xl font-bold text-primaryText mb-2">
                {example.title}
              </h3>
              <p className="text-secondaryText text-sm mb-6">
                {example.description}
              </p>
              
              {/* Iframe con PlayJS */}
              <div className="bg-black rounded mb-4 overflow-hidden border border-gray-800">
                <iframe
                  src={`https://playjs.dev/#${example.hash}`}
                  className="w-full border-none"
                  style={{ height: "300px" }}
                  title={example.title}
                />
              </div>

              <code className="text-xs text-gray-400 bg-black p-3 rounded block overflow-x-auto whitespace-pre-wrap break-words">
                {example.code}
              </code>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full text-center mt-16"
        >
          <a
            href="https://playjs.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-secondaryColor text-bgDark1 font-bold rounded-lg hover:bg-opacity-90 transition-all"
          >
            Abre el playground completo →
          </a>
        </motion.div>
      </div>
    </section>
  );
};
