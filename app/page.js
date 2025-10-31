"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function HomePage() {
  // ----------------- Estado UI y formulario -----------------
  const [mensaje, setMensaje] = useState("");
  const [lugar, setLugar] = useState("");
  const [contexto, setContexto] = useState("");
  const [enviando, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  // ----------------- Lectura en vivo de Firestore -----------------
  const [items, setItems] = useState([]);
  const testimoniosRef = useMemo(
    () => collection(db, "testimonios"),
    []
  );

  useEffect(() => {
    const q = query(testimoniosRef, orderBy("createdAt", "desc"), limit(30));
    const unsub = onSnapshot(q, (snap) => {
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setItems(rows);
    });
    return () => unsub();
  }, [testimoniosRef]);

  // ----------------- Validación sencilla -----------------
  function validar() {
    if (!mensaje || mensaje.trim().length < 20) {
      return "Cuéntanos con al menos 20 caracteres.";
    }
    if (!contexto) return "Selecciona un contexto.";
    return "";
  }

  // ----------------- Guardar testimonio -----------------
  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setOk("");

    const v = validar();
    if (v) {
      setError(v);
      return;
    }

    startTransition(async () => {
      try {
        await addDoc(testimoniosRef, {
          mensaje: mensaje.trim(),
          lugar: (lugar || "").trim(),
          contexto,
          createdAt: serverTimestamp(),
        });
        setMensaje("");
        setLugar("");
        setContexto("");
        setOk("Gracias por compartir. ¡Tu testimonio ya está en la lista!");
      } catch (err) {
        setError("No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.");
        console.error(err);
      }
    });
  }

  return (
    <div className="select-none">
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
              que mejor me mandaban a bodega porque ‘ahí casi no se ve’. ”
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
      <section id="historias" className="bg-gray-50 py-16 px-4 border-y border-gray-200">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            Historias recientes
          </h2>

          <p className="mt-2 text-gray-600 max-w-2xl text-base">
            Estos son testimonios enviados por personas en escuelas, trabajos,
            hospitales y espacios públicos. No mostramos nombres reales.
          </p>

          {/* Lista dinámica desde Firestore */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {items.length === 0 && (
              <div className="col-span-full text-sm text-gray-500">
                Aún no hay testimonios. ¡Sé la primera persona en compartir!
              </div>
            )}

            {items.map((t) => (
              <article key={t.id} className="rounded-lg border bg-white p-5 shadow-sm">
                <div
                  className="
                    text-sm text-gray-800 whitespace-pre-wrap
                    break-words [overflow-wrap:anywhere] [word-break:break-word] [hyphens:auto]
                    max-h-40 overflow-y-auto pr-1
                  "
                >
                  {`“${t.mensaje || "(sin texto)"}”`}
                </div>

                <div className="mt-4 text-[11px] text-gray-500 uppercase tracking-wide">
                  {(t.lugar || "Lugar no especificado")} · {t.contexto || "Sin contexto"}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA para compartir */}
      <section id="compartir" className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
          ¿Te ha pasado algo así?
        </h2>

        <p className="mt-4 text-base text-gray-600 md:text-lg">
          Puedes contar lo que viviste de forma anónima. No pedimos tu nombre,
          correo ni foto. Esta plataforma existe para que no puedan decir
          “eso no pasa en México”.
        </p>

        <form onSubmit={onSubmit} className="mx-auto mt-10 flex flex-col gap-4 text-left">
          <label className="text-sm font-medium text-gray-700">
            Cuéntanos qué pasó
            <textarea
              className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800 outline-none focus:border-black focus:ring-1 focus:ring-black"
              rows={4}
              placeholder="Ejemplo: En la escuela me dijeron..."
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
              minLength={20}
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            ¿Dónde pasó? (ciudad / estado)
            <input
              className="mt-2 w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-800 outline-none focus:border-black focus:ring-1 focus:ring-black"
              placeholder="Ejemplo: Puebla, Tlaxcala, etc."
              value={lugar}
              onChange={(e) => setLugar(e.target.value)}
            />
          </label>

          <label className="text-sm font-medium text-gray-700">
            Contexto
            <select
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-800 outline-none focus:border-black focus:ring-1 focus:ring-black"
              value={contexto}
              onChange={(e) => setContexto(e.target.value)}
              required
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
            disabled={enviando}
            className="mt-6 inline-block w-full rounded-lg bg-black px-5 py-3 text-center text-white text-base font-medium hover:bg-gray-800 disabled:opacity-60"
          >
            {enviando ? "Enviando…" : "Enviar testimonio"}
          </button>

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          {ok && (
            <p className="text-sm text-green-700" role="status">
              {ok}
            </p>
          )}

        </form>
      </section>
    </div>
  );
}