import { Instagram } from "@/assets/icons/Instagram";
import { Pinterest } from "@/assets/icons/Pinterest";
import { Twitter } from "@/assets/icons/Twitter";


export function Contact() {
    return (
        <>
            <section className="py-8 px-6 bg-background overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                        <div className="order-2 lg:order-1 space-y-16">
                            <div>
                                <h2 className="text-4xl font-bold font-serif mb-8 text-foreground">Hablemos de tu espacio</h2>
                                <p className="text-muted-foreground  max-w-md">
                                    Ya sea que estés planeando un nuevo proyecto o busques una pieza específica, nuestro equipo está a tu disposición para ofrecerte asesoramiento personalizado.
                                </p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-12 lg:gap-16">
                                <div className="space-y-4">
                                    <h4 className="uppercase font-bold font-serif text-foreground">Dirección</h4>
                                    <p className="text-muted-foreground">
                                        Calle de la Elegancia 124,<br />
                                        28001 Cuenca, Ecuador
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="uppercase font-bold font-serif text-foreground">Contacto</h4>
                                    <p className="text-muted-foreground">
                                        info@hogardesign.com<br />
                                        +593 912 345 678
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="uppercase font-bold font-serif text-foreground">Showroom</h4>
                                    <p className="text-muted-foreground">
                                        Lunes — Viernes: 09:00 - 20:00<br />
                                        Sábados: 10:00 - 14:00
                                    </p>
                                </div>
                                <div className="space-y-4"> 
                                    <h4 className="uppercase font-bold font-serif text-foreground">Síguenos</h4>
                                    <div className="flex gap-6">
                                        <a className="text-muted-foreground hover:text-foreground  transition-colors" href="#">
                                            <Instagram className="size-5"/>
                                        </a>
                                        <a className="text-muted-foreground hover:text-foreground  transition-colors" href="#">
                                            <Pinterest className="size-5"/>
                                        </a>
                                        <a className="text-muted-foreground hover:text-primary  transition-colors" href="#">
                                            <Twitter className="size-5"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="w-full overflow-hidden rounded-sm">
                                <img alt="Showroom minimalista y sereno de HOGAR" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwWVqM7kAnrBLf9vOQ3wW3pUz32sLUZ6PJt3xhmKI7GBJN28n5xQNzbijf3edoRqn8un8vDyBSdvWraZpWv9rJ_ClzavaHduvJPdDZUPmEpDNeLBVAza3mbdwc_bzPDiOfo2YGJmHovBmdGK7i_WrO7NOdg9PYJdKNZTkkrx79Ra98uJbK27dSSFBy6ksv4C406Tr6r8HgyXlxQsJg9Xhg3DPTXQMOl9prtzYzFhN8aLGMmYN5B4xM8bq3q3SnSf6SGNkHn-eIRtM" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20 px-6 border-t border-border">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-4xl font-serif mb-6 font-bold">Únete a nuestra estética</h2>
                    <p className="text-muted-foreground mb-10">Suscríbete para recibir lanzamientos exclusivos, perfiles de diseñadores y consejos de decoración minimalista.</p>
                    <form className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto overflow-hidden">
                        <input className="flex-1 px-6 py-4 border border-primary rounded-md" placeholder="tu@email.com" type="email" />
                        <button className="bg-primary text-primary-foreground px-8 py-4 font-medium rounded-md hover:opacity-90 transition-all cursor-pointer" type="submit">
                            Suscribirse
                        </button>
                    </form>
                </div>
            </section>
        </>
    )
}