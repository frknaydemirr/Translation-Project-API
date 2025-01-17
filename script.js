const fromLang = document.querySelector("#from-lang");
const toLang = document.querySelector("#to-lang"); // to-Lang yerine to-lang kullandık
const btnTranslate = document.querySelector("#btnTranslate");
const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");
const exchange=document.querySelector(".exchange");
const icons=document.querySelectorAll(".icons")

for (let lang in languages) {
  let option = `<option value="${lang}">${languages[lang]}</option>`;

  fromLang.insertAdjacentHTML("beforeend", option); // beforebegin yerine beforeend
  toLang.insertAdjacentHTML("beforeend", option);
  fromLang.value = "tr-TR";
  toLang.value = "en-GB";
}

btnTranslate.addEventListener("click", () => {
  let text = fromText.value;
  let from = fromLang.value;
  let to = toLang.value;
  const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) =>{
        toText.value=data.responseData.translatedText
        //consola yazdırmak yerine dinamik olarak çevrilen metine gelsin istedim ve ayarladım!
    });
});

exchange.addEventListener("click",()=>{
    let text=fromText.value;
    fromText.value=toText.value;
    toText.value=text;

    let language=fromLang.value;
    fromLang.value=toLang.value;
    toLang.value=lang;

})

for(let icon of icons){
    icon.addEventListener("click",(element)=>{
        if(element.target.classList.contains("fa-copy")){
            if(element.target.id=="from"){
                //metni kopyalama işlemi;
                navigator.clipboard.writeText(fromText.value);
            }
            else{
                navigator.clipboard.writeText(toText.value); 
            }
        }else{
            let utterance;
            if(element.target.id=="from"){
                utterance=new SpeechSynthesisUtterance(fromText.value)
                utterance.lang=fromLang.value
            }
            else{
                utterance=new SpeechSynthesisUtterance(toText.value)
                utterance.lang=toLang.value
            }
            speechSynthesis.speak(utterance);
        }
    })

}