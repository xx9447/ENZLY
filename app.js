(function(){
const root=document.querySelector('.app');
const btn=document.getElementById('themeToggle');
const icon=document.getElementById('themeIcon');
const key='qaid_theme';
function setTheme(t){root.setAttribute('data-theme',t);localStorage.setItem(key,t);if(icon)icon.textContent=t==='dark'?'🌙':'☀️';}
setTheme(localStorage.getItem(key)||'dark');
if(btn)btn.onclick=()=>{setTheme(root.getAttribute('data-theme')==='dark'?'light':'dark');};
})();