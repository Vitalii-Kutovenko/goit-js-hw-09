!function(){function e(e,t){return new Promise((function(n,o){var a=Math.random()>.3;setTimeout((function(){a?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(function(t){t.preventDefault(),function(t,n,o){for(var a=1;a<=o;a++)e(a,t).then((function(e){var t=e.position,n=e.delay;console.log("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;console.log("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))})),t+=n}(Number(t.target.elements.delay.value),Number(t.target.elements.step.value),Number(t.target.elements.amount.value))}))}();
//# sourceMappingURL=03-promises.90f3883b.js.map