// sprawdzenie czy klucz już istnieje

window.onload=function(){

let key=getKey();


if(key){

addMessage(
"🧠 Gemini jest gotowy. Wariat ma oczy.",
"ai"
);

}

else{

addMessage(
"👁️ Dodaj klucz Gemini, żeby nauczyć mnie widzieć.",
"ai"
);

}


};

</script>


</body>

</html>
