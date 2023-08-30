class t{constructor(){this.listeners={}}on(t,e){return this.listeners[t]||(this.listeners[t]=new Set),this.listeners[t].add(e),()=>this.un(t,e)}once(t,e){const s=this.on(t,e),i=this.on(t,(()=>{s(),i()}));return s}un(t,e){this.listeners[t]&&(e?this.listeners[t].delete(e):delete this.listeners[t])}unAll(){this.listeners={}}emit(t,...e){this.listeners[t]&&this.listeners[t].forEach((t=>t(...e)))}}class e extends t{constructor(t){super(),this.subscriptions=[],this.options=t}onInit(){}init(t){this.wavesurfer=t,this.onInit()}destroy(){this.emit("destroy"),this.subscriptions.forEach((t=>t()))}}function s(t,e,s,i){switch(this.bufferSize=t,this.sampleRate=e,this.bandwidth=2/t*(e/2),this.sinTable=new Float32Array(t),this.cosTable=new Float32Array(t),this.windowValues=new Float32Array(t),this.reverseTable=new Uint32Array(t),this.peakBand=0,this.peak=0,s){case"bartlett":for(a=0;a<t;a++)this.windowValues[a]=2/(t-1)*((t-1)/2-Math.abs(a-(t-1)/2));break;case"bartlettHann":for(a=0;a<t;a++)this.windowValues[a]=.62-.48*Math.abs(a/(t-1)-.5)-.38*Math.cos(2*Math.PI*a/(t-1));break;case"blackman":for(i=i||.16,a=0;a<t;a++)this.windowValues[a]=(1-i)/2-.5*Math.cos(2*Math.PI*a/(t-1))+i/2*Math.cos(4*Math.PI*a/(t-1));break;case"cosine":for(a=0;a<t;a++)this.windowValues[a]=Math.cos(Math.PI*a/(t-1)-Math.PI/2);break;case"gauss":for(i=i||.25,a=0;a<t;a++)this.windowValues[a]=Math.pow(Math.E,-.5*Math.pow((a-(t-1)/2)/(i*(t-1)/2),2));break;case"hamming":for(a=0;a<t;a++)this.windowValues[a]=.54-.46*Math.cos(2*Math.PI*a/(t-1));break;case"hann":case void 0:for(a=0;a<t;a++)this.windowValues[a]=.5*(1-Math.cos(2*Math.PI*a/(t-1)));break;case"lanczoz":for(a=0;a<t;a++)this.windowValues[a]=Math.sin(Math.PI*(2*a/(t-1)-1))/(Math.PI*(2*a/(t-1)-1));break;case"rectangular":for(a=0;a<t;a++)this.windowValues[a]=1;break;case"triangular":for(a=0;a<t;a++)this.windowValues[a]=2/t*(t/2-Math.abs(a-(t-1)/2));break;default:throw Error("No such window function '"+s+"'")}for(var a,r=1,h=t>>1;r<t;){for(a=0;a<r;a++)this.reverseTable[a+r]=this.reverseTable[a]+h;r<<=1,h>>=1}for(a=0;a<t;a++)this.sinTable[a]=Math.sin(-Math.PI/a),this.cosTable[a]=Math.cos(-Math.PI/a);this.calculateSpectrum=function(t){var e,s,i,a=this.bufferSize,r=this.cosTable,h=this.sinTable,n=this.reverseTable,l=new Float32Array(a),o=new Float32Array(a),c=2/this.bufferSize,f=Math.sqrt,p=new Float32Array(a/2),u=Math.floor(Math.log(a)/Math.LN2);if(Math.pow(2,u)!==a)throw"Invalid buffer size, must be a power of 2.";if(a!==t.length)throw"Supplied buffer is not the same size as defined FFT. FFT Size: "+a+" Buffer Size: "+t.length;for(var d,w,M,b,g,m,v,y,x=1,k=0;k<a;k++)l[k]=t[n[k]]*this.windowValues[n[k]],o[k]=0;for(;x<a;){d=r[x],w=h[x],M=1,b=0;for(var q=0;q<x;q++){for(k=q;k<a;)m=M*l[g=k+x]-b*o[g],v=M*o[g]+b*l[g],l[g]=l[k]-m,o[g]=o[k]-v,l[k]+=m,o[k]+=v,k+=x<<1;M=(y=M)*d-b*w,b=y*w+b*d}x<<=1}k=0;for(var S=a/2;k<S;k++)(i=c*f((e=l[k])*e+(s=o[k])*s))>this.peak&&(this.peakBand=k,this.peak=i),p[k]=i;return p}}class i extends e{static create(t){return new i(t||{})}constructor(t){if(super(t),this.utils={style:(t,e)=>Object.assign(t.style,e)},this.drawSpectrogram=t=>{isNaN(t[0][0])||(t=[t]),this.wrapper.style.height=this.height*t.length+"px",this.width=this.wavesurfer.getWrapper().offsetWidth,this.canvas.width=this.width,this.canvas.height=this.height*t.length;const e=this.spectrCc,s=this.height,i=this.width,a=this.buffer.sampleRate/2,r=this.frequencyMin,h=this.frequencyMax;if(e){for(let n=0;n<t.length;n++){const l=this.resample(t[n]),o=new ImageData(i,s);for(let t=0;t<l.length;t++)for(let e=0;e<l[t].length;e++){const a=this.colorMap[l[t][e]],r=4*((s-e)*i+t);o.data[r]=255*a[0],o.data[r+1]=255*a[1],o.data[r+2]=255*a[2],o.data[r+3]=255*a[3]}createImageBitmap(o).then((t=>{e.drawImage(t,0,s*(1-h/a),i,s*(h-r)/a,0,s*n,i,s)}))}this.loadLabels(this.options.labelsBackground,"12px","12px","",this.options.labelsColor,this.options.labelsHzColor||this.options.labelsColor,"center","#specLabels",t.length),this.emit("ready")}},this.frequenciesDataUrl=t.frequenciesDataUrl,this.container="string"==typeof t.container?document.querySelector(t.container):t.container,t.colorMap){if(t.colorMap.length<256)throw new Error("Colormap must contain 256 elements");for(let e=0;e<t.colorMap.length;e++){if(4!==t.colorMap[e].length)throw new Error("ColorMap entries must contain 4 values")}this.colorMap=t.colorMap}else{this.colorMap=[];for(let t=0;t<256;t++){const e=(255-t)/256;this.colorMap.push([e,e,e,1])}}this.fftSamples=t.fftSamples||512,this.height=t.height||this.fftSamples/2,this.noverlap=t.noverlap,this.windowFunc=t.windowFunc,this.alpha=t.alpha,this.frequencyMin=t.frequencyMin||0,this.frequencyMax=t.frequencyMax||0,this.createWrapper(),this.createCanvas()}onInit(){this.container=this.container||this.wavesurfer.getWrapper(),this.container.appendChild(this.wrapper),this.wavesurfer.options.fillParent&&this.utils.style(this.wrapper,{width:"100%",overflowX:"hidden",overflowY:"hidden"}),this.subscriptions.push(this.wavesurfer.on("redraw",(()=>this.render())))}destroy(){this.unAll(),this.wavesurfer.un("ready",this._onReady),this.wavesurfer.un("redraw",this._onRender),this.wavesurfer=null,this.util=null,this.options=null,this.wrapper&&(this.wrapper.remove(),this.wrapper=null),super.destroy()}createWrapper(){if(this.wrapper=document.createElement("div"),this.utils.style(this.wrapper,{display:"block",position:"relative",userSelect:"none"}),this.options.labels){const t=document.createElement("canvas");t.setAttribute("part","spec-labels"),this.utils.style(t,{position:"absolute",zIndex:9,width:"55px",height:"100%"}),this.wrapper.appendChild(t),this.labelsEl=t}this.wrapper.addEventListener("click",this._onWrapperClick)}_wrapperClickHandler(t){t.preventDefault();const e="offsetX"in t?t.offsetX:t.layerX;this.emit("click",e/this.width||0)}createCanvas(){const t=document.createElement("canvas");this.wrapper.appendChild(t),this.spectrCc=t.getContext("2d"),this.utils.style(t,{position:"absolute",left:0,top:0,width:"100%",height:"100%",zIndex:4}),this.canvas=t}render(){var t;this.frequenciesDataUrl?this.loadFrequenciesData(this.frequenciesDataUrl):this.drawSpectrogram(this.getFrequencies(null===(t=this.wavesurfer)||void 0===t?void 0:t.getDecodedData()))}getFrequencies(t){var e,i;const a=this.fftSamples,r=(null!==(e=this.options.splitChannels)&&void 0!==e?e:null===(i=this.wavesurfer)||void 0===i?void 0:i.options.splitChannels)?t.numberOfChannels:1;if(this.frequencyMax=this.frequencyMax||t.sampleRate/2,!t)return;this.buffer=t;const h=t.sampleRate,n=[];let l=this.noverlap;if(!l){const e=t.length/this.canvas.width;l=Math.max(0,Math.round(a-e))}const o=new s(a,h,this.windowFunc,this.alpha);for(let e=0;e<r;e++){const s=t.getChannelData(e),i=[];let r=0;for(;r+a<s.length;){const t=s.slice(r,r+a),e=o.calculateSpectrum(t),h=new Uint8Array(a/2);for(let t=0;t<a/2;t++)h[t]=Math.max(-255,45*Math.log10(e[t]));i.push(h),r+=a-l}n.push(i)}return n}loadFrequenciesData(t){return fetch(t).then((t=>t.json())).then(this.drawSpectrogram)}freqType(t){return t>=1e3?(t/1e3).toFixed(1):Math.round(t)}unitType(t){return t>=1e3?"KHz":"Hz"}loadLabels(t,e,s,i,a,r,h,n,l){t=t||"rgba(68,68,68,0)",e=e||"12px",s=s||"12px",i=i||"Helvetica",a=a||"#fff",r=r||"#fff",h=h||"center";const o=this.height||512,c=o/256*5,f=this.frequencyMin,p=(this.frequencyMax-f)/c,u=this.labelsEl.getContext("2d"),d=window.devicePixelRatio;if(this.labelsEl.height=this.height*l*d,this.labelsEl.width=55*d,u.scale(d,d),u)for(let n=0;n<l;n++){let l;for(u.fillStyle=t,u.fillRect(0,n*o,55,(1+n)*o),u.fill(),l=0;l<=c;l++){u.textAlign=h,u.textBaseline="middle";const t=f+p*l,c=this.freqType(t),d=this.unitType(t),w=16;let M;M=0==l?(1+n)*o+l-10:(1+n)*o-50*l+2,u.fillStyle=r,u.font=s+" "+i,u.fillText(d,w+24,M),u.fillStyle=a,u.font=e+" "+i,u.fillText(c,w,M)}}}resample(t){const e=this.width,s=[],i=1/t.length,a=1/e;let r;for(r=0;r<e;r++){const e=new Array(t[0].length);let h;for(h=0;h<t.length;h++){const s=h*i,n=s+i,l=r*a,o=l+a,c=n<=l||o<=s?0:Math.min(Math.max(n,l),Math.max(o,s))-Math.max(Math.min(n,l),Math.min(o,s));let f;if(c>0)for(f=0;f<t[0].length;f++)null==e[f]&&(e[f]=0),e[f]+=c/a*t[h][f]}const n=new Uint8Array(t[0].length);let l;for(l=0;l<t[0].length;l++)n[l]=e[l];s.push(n)}return s}}export{i as default};
