const END = 'papas.karisnxa.workers.dev';

async function pushSave(){
  const db = await idbOpen();
  const data = await db.transaction('FILE_DATA','readonly').objectStore('FILE_DATA').get('file0');
  if (data) fetch(END,{method:'POST',body:JSON.stringify(data),keepalive:true});
}
async function pullSave(){
  const remote = await fetch(END).then(r=>r.json());
  if (Object.keys(remote).length){
     const db = await idbOpen();
     await db.transaction('FILE_DATA','readwrite').objectStore('FILE_DATA').put(remote,'file0');
     location.reload();
  }
}
function idbOpen(){
  return new Promise((res,rej)=>{
    const r = indexedDB.open('PapaSaveDB',1);
    r.onsuccess=()=>res(r.result);
    r.onerror=rej;
  });
}
window.addEventListener('beforeunload',pushSave);
window.addEventListener('DOMContentLoaded',pullSave);
