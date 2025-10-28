// app/page.js
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      {/* Hero section */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:flex md:items-start md:gap-12">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
            El racismo en México no es “algo aislado”.
            <br />
            Está pasando todos los días.
          </h1>

          <p className="mt-6 text-lg text-gray-600 md:text-xl">
            Esta plataforma recopila historias reales de discriminación por
            color de piel, rasgos, lengua o identidad. Tu testimonio puede
            ayudar a demostrar que esto sí existe.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#compartir"
              className="inline-block rounded-lg bg-black px-5 py-3 text-center text-white text-base font-medium hover:bg-gray-800"
            >
              Contar mi historia
            </a>

            <a
              href="#historias"
              className="inline-block rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-700 hover:bg-gray-50"
            >
              Leer testimonios
            </a>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Público, anónimo y sin necesidad de correo.
          </p>
        </div>

        <div className="relative mt-12 md:mt-0 md:w-1/2">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-800">
              “Me dijeron que yo ‘no daba la imagen’ para estar en recepción,
              que mejor me mandaban a bodega porque ‘ahí casi no se ve’.”
            </p>
            <p className="mt-4 text-xs text-gray-500">
              Mujer, 22 años · CDMX · Sector retail
            </p>
          </div>

          <div className="absolute left-8 top-40 hidden max-w-xs rounded-xl border bg-white p-6 text-sm shadow-sm md:block">
            <p className="font-medium text-gray-800">
              “Cuando hablo mi lengua me dicen que hable ‘bien’ porque aquí es
              México.”
            </p>
            <p className="mt-4 text-xs text-gray-500">
              Hombre, 34 años · Oaxaca · Atención médica
            </p>
          </div>
        </div>
      </section>

      {/* Sección de historias */}
      <section
        id="historias"
        className="bg-gray-50 py-16 px-4 border-y border-gray-200"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            Historias recientes
          </h2>

          <p className="mt-2 text-gray-600 max-w-2xl text-base">
            Estos son testimonios enviados por personas en escuelas, trabajos,
            hospitales y espacios públicos. No mostramos nombres reales.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="text-sm text-gray-800">
                “En la entrevista me dijeron que buscaban ‘gente con mejor
                presentación’, y después vi quién sí se quedó.”
              </div>
              <div className="mt-4 text-[11px] text-gray-500 uppercase tracking-wide">
                Monterrey · Entrevista laboral
              </div>
            </article>

            <article className="rounded-lg border bg-white p-5 shadow-sm">
              <div className="text-sm text-gray-800">
                “En la tienda me siguieron como si fuera a robar. A mi amiga,
                que es más blanca, no.”
              </div>
              <div className="mt-4 text-[11px] text-gray-500 uppercase tracking-wide">
                Guadalajara · Centro comercial
              </div>
            </article>

            <article className="rounded-lg border bg-white p-5 shadow-sm">
                <div className="text-sm text-gray-800">
                  “Me dijeron ‘habla bien’ cuando hablé con mi mamá en mixe en
                  la sala de espera.”
                </div>
                <div className="mt-4 text-[11px] text-gray-500 uppercase tracking-wide">
                  Oaxaca · Clínica pública
                </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA para compartir */}
      <section
        id="compartir"
        className="mx-auto max-w-3xl px-4 py-20 text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
          ¿Te ha pasado algo así?
        </h2>

        <p className="mt-4 text-base text-gray-600 md:text-lg">
          Puedes contar lo que viviste de forma anónima. No pedimos tu nombre,
          correo ni foto. Esta plataforma existe para que no puedan decir
          “eso no pasa en México”.
        </p>

        <form className="mx-auto mt-10 flex flex-col gap-4 text-left">
          <label className="text-sm font-medium text-gray-700">
            Cuéntanos qué pasó
            <textarea
              className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800 outline-none focus:border-black focus:ring-1 focus:ring-black"
              rows={4}
              placeholder="Ejemplo: En la escuela me dijeron..."
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            ¿Dónde pasó? (ciudad / estado)
            <input
              className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800 outline-none focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Ejemplo: Puebla, Tlaxcala, etc."
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            Contexto
            <select
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-800 outline-none focus:border-black focus:ring-1 focus:ring-black"
              defaultValue=""
            >
              <option value="" disabled>
                Selecciona una opción
              </option>
              <option>Escuela / universidad</option>
              <option>Trabajo</option>
              <option>Policía / seguridad privada</option>
              <option>Salud / atención médica</option>
              <option>Otro espacio público</option>
            </select>
          </label>

          <button
            type="submit"
            className="mt-6 inline-block w-full rounded-lg bg-black px-5 py-3 text-center text-white text-base font-medium hover:bg-gray-800"
          >
            Enviar testimonio
          </button>

          <p className="text-[11px] text-gray-500 leading-snug">
            *En esta versión demo todavía no guardamos los datos. Solo es
            maqueta visual.
          </p>
        </form>
      </section>
    </>
  );
}
