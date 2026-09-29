(function () {
"use strict";
const root=document.documentElement, menu=document.getElementById("menu-toggle"), nav=document.getElementById("nav");
function closeMenu(){if(menu&&nav){menu.setAttribute("aria-expanded","false");menu.setAttribute("aria-label","Abrir menú");nav.classList.remove("open");}}
if(menu&&nav){
 menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")!=="true";menu.setAttribute("aria-expanded",String(open));menu.setAttribute("aria-label",open?"Cerrar menú":"Abrir menú");nav.classList.toggle("open",open);});
 nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
 document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu();});
 document.addEventListener("click",e=>{if(!nav.contains(e.target)&&!menu.contains(e.target))closeMenu();});
 window.addEventListener("resize",()=>{if(innerWidth>760)closeMenu();});
}
// Fotografía opcional: muestra las iniciales si img/perfil.jpg aún no existe.
const photo=document.getElementById("profile-photo"), frame=document.getElementById("portrait-frame");
function photoFallback(){if(photo){photo.hidden=true;frame.classList.add("no-photo");}}
if(photo){photo.addEventListener("error",photoFallback);if(photo.complete&&!photo.naturalWidth)photoFallback();}
// Tema claro/oscuro con preferencia guardada en el navegador.
const themeButton=document.getElementById("theme-toggle");
function getTheme(){try{const saved=localStorage.getItem("marco-portfolio-theme");if(saved==="light"||saved==="dark")return saved;}catch(e){}return matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}
function setTheme(theme,save){root.dataset.theme=theme;const dark=theme==="dark";themeButton.setAttribute("aria-pressed",String(dark));themeButton.setAttribute("aria-label",dark?"Cambiar a modo claro":"Cambiar a modo oscuro");if(save){try{localStorage.setItem("marco-portfolio-theme",theme);}catch(e){}}}
setTheme(getTheme(),false);
themeButton.addEventListener("click",()=>setTheme(root.dataset.theme==="dark"?"light":"dark",true));
// Aparición de secciones al entrar en pantalla.
const sections=document.querySelectorAll("[data-reveal]");
if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:"0px 0px -30px 0px"});
 sections.forEach(s=>observer.observe(s));
}else sections.forEach(s=>s.classList.add("visible"));
// Detalles locales de cada proyecto, sin enlaces inventados.
const projects={
 diario:["Mi Diario","Aplicación móvil de diario digital para registrar experiencias, emociones, textos y fotografías. Proyecto personal desarrollado para explorar Flutter y Dart en Android.",["Flutter","Dart","Android"]],
 chatbot:["Chatbot de videojuegos para WhatsApp","Proyecto orientado a proporcionar información sobre videojuegos, recomendaciones, noticias y próximos lanzamientos.",["JavaScript","Node.js","WhatsApp Web","JSON"]],
 datos:["Proyecto de análisis de datos","Proyecto académico enfocado en procesamiento, análisis y visualización de datos.",["Python","Pandas","SQL"]],
 web:["Sitio web de psicología","Proyecto académico para practicar estructura HTML, diseño CSS e interacción mediante JavaScript.",["HTML","CSS","JavaScript"]],
 asistente:["Asistente de programación con IA","Proyecto experimental para utilizar inteligencia artificial como apoyo al generar y revisar código.",["Python","Inteligencia artificial"]]
};
const dialog=document.getElementById("project-dialog"), title=document.getElementById("dialog-title"), description=document.getElementById("dialog-description"), tags=document.getElementById("dialog-tags");
document.querySelectorAll("[data-project]").forEach(button=>button.addEventListener("click",()=>{const item=projects[button.dataset.project];if(!item)return;title.textContent=item[0];description.textContent=item[1];tags.replaceChildren(...item[2].map(text=>{const span=document.createElement("span");span.textContent=text;return span;}));if(dialog.showModal)dialog.showModal();else dialog.setAttribute("open","");}));
document.getElementById("dialog-close").addEventListener("click",()=>dialog.close?dialog.close():dialog.removeAttribute("open"));
dialog.addEventListener("click",e=>{if(e.target===dialog&&dialog.close)dialog.close();});
// Enlaces sociales marcados como pendientes hasta añadir URLs reales.
document.querySelectorAll("[data-placeholder]").forEach(link=>link.addEventListener("click",e=>{e.preventDefault();document.getElementById("announcements").textContent="El enlace de "+link.dataset.placeholder+" está pendiente de agregar."; }));
// Validación del formulario; no transmite ni guarda el mensaje.
const form=document.getElementById("contact-form"), status=document.getElementById("form-status");
const fields=[["name","name-error","nombre"],["email","email-error","correo electrónico"],["message","message-error","mensaje"]].map(x=>({input:document.getElementById(x[0]),error:document.getElementById(x[1]),label:x[2]}));
fields.forEach(f=>f.input.addEventListener("input",()=>{if(f.input.value.trim()){f.input.setAttribute("aria-invalid","false");f.error.textContent="";}}));
form.addEventListener("submit",e=>{e.preventDefault();let first=null;
 fields.forEach(f=>{let msg="";if(!f.input.value.trim())msg="Completa este campo.";else if(f.input.type==="email"&&!f.input.validity.valid)msg="Escribe un correo electrónico válido.";f.input.setAttribute("aria-invalid",String(!!msg));f.error.textContent=msg;if(msg&&!first)first=f.input;});
 status.classList.remove("error");if(first){status.textContent="Revisa los campos marcados para continuar.";status.classList.add("error");first.focus();return;}
 status.textContent="Tu formulario está listo. Para enviar el mensaje de verdad, será necesario conectarlo a un servicio o backend.";
});
})();

