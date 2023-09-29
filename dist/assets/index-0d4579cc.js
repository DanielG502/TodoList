(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function c(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=c(o);fetch(o.href,n)}})();const b=`<section class="todoapp">
    <header class="header">
        <h1>Lista de Tareas</h1>
        <input
            id="new-todo-input"
            class="new-todo"
            placeholder="¿Qué Necesitas Hacer?"
            autofocus />
    </header>

    <section class="main">
        <input
            id="toggle-all"
            class="toggle-all"
            type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list"></ul>
    </section>

    <footer class="footer">
        <span class="todo-count"
            ><strong id="pending-count">0</strong> pendiente(s)</span
        >
        <ul class="filters">
            <li>
                <a
                    class="filtro"
                    class="selected"
                    href="#/"
                    >Todos</a
                >
            </li>
            <li>
                <a
                    class="filtro"
                    href="#/active"
                    >Pendientes</a
                >
            </li>
            <li>
                <a
                    class="filtro"
                    href="#/completed"
                    >Completados</a
                >
            </li>
        </ul>
        <button class="clear-completed">Borrar completados</button>
    </footer>
</section>
`;let y;const E=new Uint8Array(16);function S(){if(!y&&(y=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!y))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return y(E)}const r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).slice(1));function v(e,t=0){return r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]}const C=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),L={randomUUID:C};function A(e,t,c){if(L.randomUUID&&!t&&!e)return L.randomUUID();e=e||{};const i=e.random||(e.rng||S)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){c=c||0;for(let o=0;o<16;++o)t[c+o]=i[o];return t}return v(i)}class P{constructor(t){this.id=A(),this.description=t,this.done=!1,this.createdAt=new Date}}const a={All:"all",Complete:"complete",Pending:"pending"},l={todos:[],filter:a.All},I=()=>{w(),console.log("InitStore")},w=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=a.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(l))},U=(e=a.All)=>{switch(e){case a.All:return[...l.todos];case a.Complete:return l.todos.filter(t=>t.done);case a.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},D=e=>{if(!e)throw new Error("Description is required");l.todos.push(new P(e)),f()},F=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},O=e=>{l.todos=l.todos.filter(t=>t.id!==e),f()},q=()=>{l.todos=l.todos.filter(e=>!e.done),f()},x=(e=Filter.All)=>{l.filter=e,f()},N=()=>l.filter,d={addTodo:D,deleteComplete:q,deleteTodo:O,getCurrentFilter:N,getTodos:U,initStore:I,toggleTodo:F,setFilter:x,loadStore:w},k=e=>{if(!e)throw new Error("A TODO object is Required");const{done:t,description:c,id:i}=e,o=`
    <div class="view">
        <input class="toggle" type="checkbox" ${t?"checked":""}>
        <label>${c}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",i),e.done&&n.classList.add("completed"),n};let g;const M=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element ${e} not found`);g.innerHTML="",t.forEach(c=>{g.append(k(c))})};let T;const H=e=>{if(T||(T=document.querySelector(e)),!T)throw new Error(`Element ${e} not found`);T.innerHTML=d.getTodos(a.Pending).length},m={clearCompleteButton:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},$=e=>{const t=()=>{const s=d.getTodos(d.getCurrentFilter());M(m.TodoList,s),c()},c=()=>{H(m.PendingCountLabel)};(()=>{const s=document.createElement("div");s.innerHTML=b,document.querySelector(e).append(s),t()})();const i=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),n=document.querySelector(m.clearCompleteButton),u=document.querySelectorAll(m.TodoFilters);i.addEventListener("keyup",s=>{s.keyCode===13&&s.target.value.trim().length!==0&&(d.addTodo(s.target.value),t(),s.target.value="")}),o.addEventListener("click",s=>{const p=s.target.closest("[data-id]");d.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",s=>{const p=s.target.className==="destroy",h=s.target.closest("[data-id]");!h||!p||(d.deleteTodo(h.getAttribute("data-id")),t())}),n.addEventListener("click",()=>{d.deleteComplete(),t()}),u.forEach(s=>{s.addEventListener("click",p=>{switch(u.forEach(h=>h.classList.remove("selected")),p.target.classList.add("selected"),p.target.text){case"Todos":d.setFilter(a.All);break;case"Pendientes":d.setFilter(a.Pending);break;case"Completados":d.setFilter(a.Complete);break}t()})})};d.initStore();$("#app");
