const PP_POINTS='pixelPartyPoints',PP_ITEMS='pixelPartyItems';
function ppGetPoints(){return Number(localStorage.getItem(PP_POINTS)||0)}
function ppItems(){try{return JSON.parse(localStorage.getItem(PP_ITEMS)||'{}')}catch{return {}}}
function ppSave(){localStorage.setItem(PP_POINTS,String(ppGetPoints()));window.dispatchEvent(new Event('pointschange'))}
function ppEarn(amount){const multiplier=ppItems().double?2:1;localStorage.setItem(PP_POINTS,String(ppGetPoints()+amount*multiplier));ppSave()}
function ppSpend(amount){if(ppGetPoints()<amount)return false;localStorage.setItem(PP_POINTS,String(ppGetPoints()-amount));ppSave();return true}
function ppBuy(id,cost){const items=ppItems();if(items[id]||!ppSpend(cost))return false;items[id]=true;localStorage.setItem(PP_ITEMS,JSON.stringify(items));if(id==='bank'){localStorage.setItem(PP_POINTS,String(ppGetPoints()+75));ppSave()}window.dispatchEvent(new Event('pointschange'));return true}
window.pixelParty={getPoints:ppGetPoints,earn:ppEarn,spend:ppSpend,buy:ppBuy,items:ppItems};
document.addEventListener('DOMContentLoaded',()=>{const badge=document.querySelector('[data-points]');const refresh=()=>{if(badge)badge.textContent=ppGetPoints()+' points';if(ppItems().glow)document.body.classList.add('shop-glow')};refresh();window.addEventListener('pointschange',refresh)});
