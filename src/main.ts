const radiusSlider = document.getElementById("radius") as HTMLInputElement ;
const alpha=document.getElementById("alpha") as HTMLInputElement;
const color=document.getElementById("colorPicker") as HTMLInputElement ;
const backColor=document.getElementById("backColorPicker") as HTMLInputElement ;
const centerkColor=document.getElementById("centerColorPicker") as HTMLInputElement ;
const boxColor=document.getElementById("box") as HTMLInputElement ;
const centerCirlce=document.getElementById("center-circle") as HTMLInputElement ;
const glare = document.getElementById("glare") as HTMLInputElement ;
const checkbox = document.getElementById("checkbox") as HTMLInputElement ;

/*二個目*/
const secondRadiusSlider = document.getElementById("secondRadius") as HTMLInputElement ;
const secondAlpha=document.getElementById("secondAlpha") as HTMLInputElement;
const secondColor=document.getElementById("secondColorPicker") as HTMLInputElement ;
const secondGlare=document.getElementById("secondGlare") as HTMLInputElement ;
/*クローンを管理する配列*/
interface Star{
  element: HTMLElement;
  glare: HTMLElement;
  secondGlare:HTMLElement;
  center:HTMLElement;
}

const stars: Star[]=[];
const size=document.getElementById("size") as HTMLInputElement;
const num=document.getElementById("num") as HTMLInputElement;


/*星空*/
const sky=document.getElementById("sky") as HTMLElement;
const template=document.getElementById("tmplate") as HTMLTemplateElement;
let starNum:number=20;

/*チェックボックス用のフラグ*/
let isCheck:boolean=false;

/*一個目のグレア*/
radiusSlider?.addEventListener("input", () => {
  const r = radiusSlider.value; 
  if(glare){
    glare.style.width = r + "px";
    glare.style.height = r + "px";
  }
  stars.forEach((star)=>{
    star.glare.style.width=r+"px";
    star.glare.style.height=r+"px";
  });
});

checkbox?.addEventListener("change",()=>{
  if(checkbox.checked){
    isCheck=true;
  }else{
    isCheck=false;
  }
});


color?.addEventListener("input",()=>{
  const hex=color.value;
  changeGlareColor(hex,glare);

  stars.forEach((star)=>{
    changeGlareColor(hex,star.glare)
  });
});

backColor?.addEventListener("input",()=>{
  const hex=backColor.value;
  if(isCheck){
    chageBackColor(hex);
    chageCenterColor(hex);
    centerkColor.disabled = true;
  }else{
    chageBackColor(hex);
    centerkColor.disabled = false;
  }
});

centerkColor?.addEventListener("input",()=>{
  const hex=centerkColor.value;
  if(!isCheck){
    chageCenterColor(hex);
  }
});




alpha?.addEventListener("input",()=>{
  const a=parseInt(alpha.value)/50;
  if(glare){
    glare.style.opacity=String(a);
  }

  stars.forEach((star)=>{
    star.glare.style.opacity=String(a);
  });
});



/*二個目のグレア*/

secondRadiusSlider?.addEventListener("input", () => {
  const r = secondRadiusSlider.value; 
  if(secondGlare){
    secondGlare.style.width = r + "px";
    secondGlare.style.height = r + "px";
  }
  stars.forEach(star => {
    star. secondGlare.style.width = r + "px";
    star. secondGlare.style.height = r + "px";
  });
});

secondColor?.addEventListener("input",()=>{
  const hex=secondColor.value;
   changeSecondGlareColor(hex,secondGlare);
  stars.forEach((star)=>{
    changeSecondGlareColor(hex,star.secondGlare);
  });
  
});

secondAlpha?.addEventListener("input",()=>{
  const a=parseInt(secondAlpha.value)/50;
  if(secondGlare){
    secondGlare.style.opacity=String(a);
  }
  stars.forEach((star)=>{
    star.secondGlare.style.opacity=String(a);
  });
});

/*星空表示*/
for(let i=0;i<starNum;i++){
  const clone= template.content.cloneNode(true) as DocumentFragment;
  const starEl=clone.querySelector(".star") as HTMLElement;
  const glareEl=starEl.querySelector(".glare") as HTMLElement;
  const secondGlareEl=starEl.querySelector(".secondGlare") as HTMLElement;
  const centerEl = starEl.querySelector(".center-circle") as HTMLElement;

  const x=Math.random()*sky.clientWidth;
  const y=Math.random()*sky.clientHeight;

  starEl.style.position = "absolute";
  starEl.style.transform = "scale(0.1)";
  starEl.style.left = `${x}px`;
  starEl.style.top = `${y}px`;

  sky.appendChild(clone);
  stars.push({ element: starEl, glare: glareEl,secondGlare:secondGlareEl, center: centerEl });
}

size?.addEventListener("input",()=>{
  console.log("size="+size);
  const s = parseFloat(size.value)/50;

  stars.forEach((star)=>{
    star.element.style.transform = `scale(${s})`;
  })
});


num?.addEventListener("input",()=>{
  const s = parseFloat(size.value)/50;

  // 既存の星を全削除
  stars.forEach(star => {
    star.element.remove();
  });
  stars.length = 0;
  const count=parseInt(num.value);
  console.log("count="+count);

  // 新しい星を count 分生成
  for (let i = 0; i < count; i++) {
   

    const clone = template.content.cloneNode(true) as DocumentFragment;
    const starEl = clone.querySelector(".star") as HTMLElement;
    const glareEl =clone.querySelector(".glare") as HTMLElement ;
    const secondGlareEl = starEl.querySelector(".secondGlare") as HTMLElement;
    const centerEl = starEl.querySelector(".center-circle") as HTMLElement;
    //中心の色を現在の設定と合わせる
    const currentCenterColor = centerkColor?.value ?? "#ffffff";
    centerEl.style.background = currentCenterColor;
    //1個目のグレアの色を現在の設定と合わせる
 

    function randCenterBias() {
      // 中心寄りの値を出す
      return (Math.random() + Math.random() + Math.random()) / 3;
    }

    // sky の中心付近に配置されやすくなる
    const x = randCenterBias() * sky.clientWidth;
    const y = randCenterBias() * sky.clientHeight;

    starEl.style.position = "absolute";
    starEl.style.transform = "scale(0.1)";
    starEl.style.left = `${x}px`;
    starEl.style.top = `${y}px`;
    starEl.style.transform = `scale(${s})`;

    sky.appendChild(clone);
    stars.push({ element: starEl, glare: glareEl, secondGlare: secondGlareEl, center: centerEl });
  }

  const color1=color?.value;
  const color2=secondColor?.value;
  const a1=parseInt(alpha.value)/50;
  const a2=parseInt(secondAlpha.value)/50;
  stars.forEach((star)=>{
    changeGlareColor(color1,star.glare);
    changeSecondGlareColor(color2,star.secondGlare);
    star.glare.style.opacity=String(a1);
    star.secondGlare.style.opacity=String(a2);
  });
});


/*ファンクションたち*/
function changeGlareColor(hex:string,glare:any){
  const {r,g,b}=hexToRgb(hex);
  if(glare){
    glare.style.background=`
    radial-gradient(
        circle,
        rgba(${r}, ${g}, ${b}, 1) 30%,
        rgba(${r}, ${g}, ${b}, 0.85) 35%,
        rgba(${r}, ${g}, ${b}, 0.7) 40%,
        rgba(${r}, ${g}, ${b}, 0.4) 50%,
        rgba(${r}, ${g}, ${b}, 0.1) 60%,
        rgba(${r}, ${g}, ${b}, 0.01) 70%
      )
    `;
  }

}

function changeSecondGlareColor(hex:string,glare:any){
  const {r,g,b}=hexToRgb(hex);
  if(glare){
    glare.style.background=`
    radial-gradient(
        circle,
        rgba(${r}, ${g}, ${b}, 1) 15%,
        rgba(${r}, ${g}, ${b}, 0.7) 30%,
        rgba(${r}, ${g}, ${b}, 0.4) 50%,
        rgba(${r}, ${g}, ${b}, 0.01) 70%
      )
    `;
  }

}

function hexToRgb(hex: string){
  const r=parseInt(hex.slice(1,3),16);
  const g=parseInt(hex.slice(3,5),16);
  const b=parseInt(hex.slice(5,7),16);
  return {r,g,b};
}

function chageBackColor(hex:string){
  if(boxColor){
    boxColor.style.background=`${hex}`;
  }
  if(sky){
    sky.style.background=`${hex}`;
  }
}

function chageCenterColor(hex:string){
  if(centerCirlce){
    centerCirlce.style.background=`${hex}`;
  }
  stars.forEach((star)=>{
    star.center.style.background=`${hex}`;
  });
}



const box = document.getElementById("box2") as HTMLInputElement;
const dNum = document.getElementById("dNum") as HTMLInputElement;
const dColor = document.getElementById("dColor") as HTMLInputElement;
const dSize = document.getElementById("dSize") as HTMLInputElement;
const dCenter = document.getElementById("dCenter-circle") as HTMLInputElement;

function darkenColor(hex:any, amount:any) {


  amount=amount*1.3;

  hex;
  
  const nr = 255-(amount*255)+20;
  const ng =255-(amount*255)+20;
  const nb =255-(amount*255)+20;

  return `rgb(${nr}, ${ng}, ${nb})`;
}

function renderDCircles() {
  const num = Number(dNum.value) ;
  const baseColor = dColor.value;
  const size = Number(dSize.value);

  // 中心座標
  const centerX = box.clientWidth / 2;
  const centerY = box.clientHeight / 2;

  // 最大距離
  const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

  // リセット
  box.innerHTML = "";

  for (let i = 0; i < num; i++) {
    const circle = document.createElement("div");
    circle.classList.add("dCircle");

    function bias() {
      return (Math.random() + Math.random() + Math.random()) / 3;
    }

    const x = bias() * (box.clientWidth - size);
    const y = bias() * (box.clientHeight - size);

    // 中心からの距離
    const dx = x + size / 2 - centerX;
    const dy = y + size / 2 - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy)-100;

    // 距離に応じた暗さ (0→明るい、1→暗い)
    const amount = (dist / maxDist)

    // 色を暗くする
    const color = darkenColor(baseColor, amount);

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.background = color;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    box.appendChild(circle);
  }

  // 中央の円を最後に載せる（前面に来る）
  box.appendChild(dCenter);
}

renderDCircles();

dNum.addEventListener("input", renderDCircles);
dColor.addEventListener("input", renderDCircles);
dSize.addEventListener("input", renderDCircles);


