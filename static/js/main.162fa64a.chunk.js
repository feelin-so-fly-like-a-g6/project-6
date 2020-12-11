(this["webpackJsonpproject-6"]=this["webpackJsonpproject-6"]||[]).push([[0],{14:function(e,t,s){},34:function(e,t,s){},55:function(e,t,s){"use strict";s.r(t);var n=s(1),r=s(3),i=s.n(r),a=s(26),l=s.n(a),o=(s(34),s(27)),c=s(4),h=s(5),u=s(7),p=s(6),d=(s(14),function(e){Object(u.a)(s,e);var t=Object(p.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(h.a)(s,[{key:"render",value:function(){return Object(n.jsxs)("header",{children:[Object(n.jsx)("h1",{children:"Haikus Ahoy!"}),Object(n.jsx)("h2",{children:"Knowing The Ropes"}),Object(n.jsx)("button",{onClick:this.props.toggleModal,children:"Click here for instructions"})]})}}]),s}(r.Component)),b=s(28),j=function(e){Object(u.a)(s,e);var t=Object(p.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(h.a)(s,[{key:"render",value:function(){return Object(n.jsxs)("section",{className:"modal",children:[Object(n.jsx)("h2",{children:"Knowing The Ropes"}),Object(n.jsx)("p",{children:"Welcome to Haiku Ahoy, Sailor!"}),Object(n.jsx)("p",{children:"Instructions HERE"}),Object(n.jsx)("p",{children:"Are you ready to set sail?"}),Object(n.jsx)("button",{onClick:this.props.toggleModal,children:Object(n.jsx)(b.a,{})})]})}}]),s}(r.Component),m=function(e){Object(u.a)(s,e);var t=Object(p.a)(s);function s(){var e;Object(c.a)(this,s);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={showing:!1,buttonState:""},e.toggleClick=function(t){var s="";e.state.showing||(s="moveUp"),e.setState({showing:!e.state.showing,buttonState:s})},e}return Object(h.a)(s,[{key:"render",value:function(){return Object(n.jsx)("div",{className:"Wrapper",children:Object(n.jsxs)("div",{className:"Intro",children:[Object(n.jsx)("button",{className:"button title ".concat(this.state.buttonState),onClick:this.toggleClick,children:"Haiku Ahoy!"}),this.state.showing?Object(n.jsx)("div",{className:"Introduction",children:Object(n.jsxs)("article",{children:[Object(n.jsx)("p",{children:"A haiku (\u4ff3\u53e5 high-koo) is a short three-line poem that usually follows a 5-7-5 syllable structure. Haiku poetry was originally developed by Japanese poets, and is often inspired by nature, a moment of beauty, or a poignant experience."}),Object(n.jsx)("h1",{children:"How to write Haiku:"}),Object(n.jsxs)("p",{className:"HowTo",children:["Haikus follow a strict form:",Object(n.jsx)("br",{}),"Three lines, with a 5-7-5 syllable structure. That means the first line will have five syllables, the second line will have seven syllables, and the last line will have five syllables."]}),Object(n.jsx)("h2",{children:"Examples of Haikus:"}),Object(n.jsxs)("p",{className:"example",children:["A winter blanket",Object(n.jsx)("br",{}),"covers the Earth in repose",Object(n.jsx)("br",{}),"but only a dream"]}),Object(n.jsx)("button",{className:"button CreateOwn",onClick:this.props.changeVerseVisible,children:"Create your own!"})]})}):null]})})}}]),s}(r.Component),O=s(16),g=s(12),f=s.n(g),v=function(e){Object(u.a)(s,e);var t=Object(p.a)(s);function s(){var e;return Object(c.a)(this,s),(e=t.call(this)).calculateFilledSylls=function(){if(e.props.line.length>0){var t=e.props.line.map((function(e){return e.numSyllables})).reduce((function(e,t){return e+t}));return console.log(t),t}return 0},e.getWords=function(t){f()({url:"https://api.datamuse.com/words",responseType:"json",method:"GET",params:{rel_bga:t,md:"s"}}).then((function(t){e.filterResults(t.data)}))},e.filterResults=function(t){var s=t.filter((function(t){return t.numSyllables<=e.state.remainSylls}));e.randomize(s);var n=s.slice(0,5);e.setState({results:n})},e.randomize=function(e){for(var t=0,s=0,n=1;n<e.length;n++)t=Math.floor(Math.random()*n),s=e[n],e[n]=e[t],e[t]=s},e.handleSelect=function(t){var s=t.target.dataset.word,n=t.target.dataset.syll;e.setState({userSelect:{word:s,numSyllables:n}},(function(){e.handleSubmit(t)}))},e.handleSubmit=function(t){t.preventDefault(),e.setState({lineInProgress:[].concat(Object(O.a)(e.state.lineInProgress),[{word:e.state.userSelect.word,numSyllables:parseInt(e.state.userSelect.numSyllables)}]),remainSylls:e.state.remainSylls-e.state.userSelect.numSyllables},(function(){0===e.state.remainSylls&&e.props.changeVerseVisible(),e.props.updateHaiku(e.props.lineNumber,e.state.lineInProgress)})),e.getWords(e.state.userSelect.word)},e.removeLastWord=function(t){t.preventDefault();var s=Object(O.a)(e.state.lineInProgress),n=s.pop();e.setState({lineInProgress:s,remainSylls:e.state.remainSylls+n.numSyllables},(function(){!e.state.lineInProgress===[]&&(console.log("line empty"),e.props.reRenderVerse()),e.props.updateHaiku(e.props.lineNumber,e.state.lineInProgress),e.setState({userSelect:e.state.lineInProgress[e.state.lineInProgress.length-1]},(function(){e.state.userSelect&&e.getWords(e.state.userSelect.word)}))}))},e.removeEverything=function(){e.setState({lineInProgress:""},(function(){e.props.updateHaiku(e.props.lineNumber,e.state.lineInProgress)}))},e.state={remainSylls:null,userSelect:{word:"",numSyllables:null},lineInProgress:"",results:[]},e}return Object(h.a)(s,[{key:"componentDidMount",value:function(){var e=this;this.calculateFilledSylls(),this.setState({lineInProgress:this.props.line.length>0?this.props.line:[{word:this.props.word,numSyllables:this.props.sylls}],remainSylls:this.props.totalSylls-(this.props.sylls?this.props.sylls:this.calculateFilledSylls()),userSelect:{numSyllables:this.props.sylls?this.props.sylls:this.props.line[this.props.line.length-1].numSyllables,word:this.props.word?this.props.word:this.props.line[this.props.line.length-1].word}},(function(){e.props.updateHaiku(e.props.lineNumber,e.state.lineInProgress),e.getWords(e.state.userSelect.word)}))}},{key:"render",value:function(){var e=this;return Object(n.jsxs)("div",{className:"Compose",children:[Object(n.jsxs)("p",{children:["Syllables left: ",this.state.remainSylls]}),Object(n.jsx)("h3",{className:"srOnly",children:"Word options:"}),0!==this.state.remainSylls?Object(n.jsxs)("form",{children:[Object(n.jsx)("label",{htmlFor:"word",children:"Choose a word:"}),Object(n.jsx)("ul",{className:"wordPicker",name:"wordSelect",id:"word",children:this.state.results.map((function(t){return"."!==t.word?Object(n.jsx)("li",{className:"wordOption","data-syll":t.numSyllables,"data-word":t.word,onClick:e.handleSelect,children:t.word},t.score):null}))})]}):"Line complete",this.state.remainSylls<5&&Object(n.jsxs)("div",{className:"controls",children:[Object(n.jsx)("button",{className:"removeLastWord",onClick:this.removeLastWord,children:"Remove the last word"}),Object(n.jsx)("button",{className:"removeEverything",onClick:this.removeEverything,children:"Start over"})]})]})}}]),s}(r.Component),y=function(){return Object(n.jsx)("p",{children:"Please enter a letter to get some words."})},x=function(e){Object(u.a)(s,e);var t=Object(p.a)(s);function s(){var e;return Object(c.a)(this,s),(e=t.call(this)).getSuggestions=function(t){/^([a-z\w])+$/.test(t)&&""!==t?f()({url:"https://api.datamuse.com/sug",responseType:"json",method:"GET",params:{s:t}}).then((function(t){var s=t.data.filter((function(t){return/^([a-z])+$/.test(t.word)?(e.setState({showError:!1}),t):(console.log(t.word.charAt(0).toUpperCase()+t.word.slice(1)),t.word.charAt(0).toUpperCase()+t.word.slice(1))})).splice(0,5).map((function(e){return{word:e.word.charAt(0).toUpperCase()+e.word.slice(1),numSyllables:e.numSyllables}}));e.setState({suggestions:s})})):e.setState({suggestions:[],showError:!0})},e.getWordInfo=function(t){var s=t.target.dataset.name;f()({url:"https://api.datamuse.com/words",responseType:"json",method:"GET",params:{sp:s,md:"s"}}).then((function(t){var s=t.data;console.log(s[0]),e.props.updateSearchQuery(s[0])}))},e.state={suggestions:"",showError:!1},e}return Object(h.a)(s,[{key:"render",value:function(){var e=this;return Object(n.jsxs)("section",{className:"Search",children:[Object(n.jsxs)("form",{children:[Object(n.jsx)("label",{className:"srOnly",htmlFor:"search",children:"Input your word"}),Object(n.jsx)("input",{autoComplete:"off",type:"text",id:"search",placeholder:"Enter starting word here",onChange:function(t){e.getSuggestions(t.target.value)}})]}),this.state.showError?Object(n.jsx)(y,{}):"",Object(n.jsx)("ul",{className:"suggestedWords",children:this.state.suggestions&&this.state.suggestions.map((function(t){return Object(n.jsx)("li",{onClick:e.getWordInfo,"data-name":t.word,children:t.word},t.score)}))})]})}}]),s}(r.Component),S=function(e){Object(u.a)(s,e);var t=Object(p.a)(s);function s(){var e;return Object(c.a)(this,s),(e=t.call(this)).updateSearchQuery=function(t){var s=t.word,n=t.numSyllables;s=s.charAt(0).toUpperCase()+s.slice(1),e.setState({searchQuery:{word:s,numSyllables:n}})},e.reRender=function(){e.forrceUpdate()},e.state={searchQuery:{word:"",numSyllables:""}},e}return Object(h.a)(s,[{key:"render",value:function(){return Object(n.jsxs)("div",{className:"verse",children:[this.props.line.length>0||this.state.searchQuery.word?Object(n.jsx)(v,{updateHaiku:this.props.updateHaiku,word:this.state.searchQuery.word,sylls:this.state.searchQuery.numSyllables,totalSylls:5,lineNumber:this.props.lineNumber,line:this.props.line,changeVerseVisible:this.props.changeVerseVisible,getHaikus:this.props.getHaikus,reRenderVerse:this.reRender}):Object(n.jsx)(x,{updateSearchQuery:this.updateSearchQuery}),(2===this.props.lineNumber||3===this.props.lineNumber)&&Object(n.jsx)("button",{onClick:this.props.goToPreviousLine,children:"Go to previous line"})]})}}]),s}(r.Component),w=function(e){Object(u.a)(s,e);var t=Object(p.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(h.a)(s,[{key:"printLine",value:function(e){if(0!==this.props["line".concat(e)].length)return e===this.props.active&&this.props.active<4?this.props["line".concat(this.props.active)].slice(0,this.props["line".concat(this.props.active)].length-1).map((function(e){return e.word})).join(" "):this.props["line".concat(e)].map((function(e){return e.word})).join(" ")}},{key:"lastWord",value:function(e){var t=0;if(this.props.active<4&&(t=this.props["line".concat(this.props.active)].length,0!==this.props["line".concat(this.props.active)].length&&e===this.props.active))return Object(n.jsx)("span",{className:"CurrentWord",children:this.props["line".concat(this.props.active)][t-1].word})}},{key:"render",value:function(){return Object(n.jsxs)("section",{className:"haiku",children:[Object(n.jsx)("h3",{children:"Let's write some Haiku"}),Object(n.jsxs)("p",{children:[Object(n.jsx)("span",{children:" "}),this.props.line1&&this.printLine(1),Object(n.jsx)("span",{children:" "}),this.lastWord(1)]}),Object(n.jsxs)("p",{children:[Object(n.jsx)("span",{children:" "}),this.props.line1&&this.printLine(2),Object(n.jsx)("span",{children:" "}),this.lastWord(2)]}),Object(n.jsxs)("p",{children:[Object(n.jsx)("span",{children:" "}),this.props.line1&&this.printLine(3),Object(n.jsx)("span",{children:" "}),this.lastWord(3)]})]})}}]),s}(r.Component),k=s(15);s(52);k.a.initializeApp({apiKey:"AIzaSyBk6aNK81E9i8yvY4Oc355hl2H6x8z7vp0",authDomain:"haiku-ahoy.firebaseapp.com",projectId:"haiku-ahoy",storageBucket:"haiku-ahoy.appspot.com",messagingSenderId:"342321447502",appId:"1:342321447502:web:05c7ed94699f12c186b91f"});var V=k.a,C=function(e){Object(u.a)(s,e);var t=Object(p.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(h.a)(s,[{key:"componentDidMount",value:function(){var e=this;V.database().ref().on("value",(function(t){var s=t.val();s=Object.values(s),e.props.getHaikus(s)}))}},{key:"render",value:function(){return Object(n.jsxs)("section",{className:"logbook",children:[Object(n.jsx)("h2",{children:"Log Book"}),Object(n.jsx)("ul",{children:this.props.allHaikus.map((function(e){return Object(n.jsxs)("li",{tabIndex:"0",children:[Object(n.jsx)("p",{children:e.line1}),Object(n.jsx)("p",{children:e.line2}),Object(n.jsx)("p",{children:e.line3})]})}))})]})}}]),s}(r.Component);var H=function(){return Object(n.jsxs)("footer",{children:[Object(n.jsxs)("p",{children:["Made by the G6 Crew \u2693 @ ",Object(n.jsx)("a",{href:"https://junocollege.com/",children:"Juno College"})]}),Object(n.jsxs)("p",{children:[Object(n.jsx)("a",{href:"https://christinayu.dev/",target:"_blank",rel:"noreferrer",children:"Christina Yu"}),", ",Object(n.jsx)("a",{href:"https://daveratcliffe.com/",target:"_blank",rel:"noreferrer",children:"Dave Ratcliffe"}),", ",Object(n.jsx)("a",{href:"https://ermekcodes.com/",target:"_blank",rel:"noreferrer",children:"Ermek Barmashev"}),", ",Object(n.jsx)("a",{href:"https://sylcodes.com/",target:"_blank",rel:"noreferrer",children:"Syl Aucoin"})]})]})},N=function(e){Object(u.a)(s,e);var t=Object(p.a)(s);function s(){var e;Object(c.a)(this,s);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).saveHaiku=function(t){t.preventDefault();var s={line1:e.props.line1&&e.props.line1.map((function(e){return e.word})).join(" "),line2:e.props.line2&&e.props.line2.map((function(e){return e.word})).join(" "),line3:e.props.line3&&e.props.line3.map((function(e){return e.word})).join(" ")};V.database().ref().push(s)},e}return Object(h.a)(s,[{key:"render",value:function(){return Object(n.jsxs)("div",{children:[Object(n.jsx)("h1",{children:"Finish"}),Object(n.jsx)(w,{line1:this.props.line1,line2:this.props.line2,line3:this.props.line3}),Object(n.jsx)("button",{onClick:this.saveHaiku,children:"Save haiku"})]})}}]),s}(r.Component),I=function(e){Object(u.a)(s,e);var t=Object(p.a)(s);function s(){var e;return Object(c.a)(this,s),(e=t.call(this)).updateHaiku=function(t,s){var n="line".concat(t);e.setState(Object(o.a)({},n,s))},e.changeVerseVisible=function(){e.setState({verseVisible:++e.state.verseVisible}),e.setState({headerVisible:!0})},e.goToPreviousLine=function(){var t=e.state.verseVisible-1;e.setState({verseVisible:t})},e.getHaikus=function(t){e.setState({allHaikus:t})},e.toggleModal=function(){e.setState({modalVisible:!e.state.modalVisible})},e.state={verseVisible:0,line1:[],line2:[],line3:[],headerVisible:!1,modalVisible:!1,allHaikus:[]},e}return Object(h.a)(s,[{key:"render",value:function(){return Object(n.jsxs)("div",{className:"App",children:[0===this.state.verseVisible&&Object(n.jsx)(n.Fragment,{children:Object(n.jsx)(m,{changeVerseVisible:this.changeVerseVisible})}),this.state.headerVisible?Object(n.jsx)(d,{modalVisible:this.state.modalVisible,toggleModal:this.toggleModal}):null,this.state.modalVisible?Object(n.jsx)(j,{toggleModal:this.toggleModal}):null,Object(n.jsxs)("main",{children:[1===this.state.verseVisible&&Object(n.jsx)(S,{updateHaiku:this.updateHaiku,lineNumber:1,line:this.state.line1,totalNumSyllables:5,changeVerseVisible:this.changeVerseVisible}),2===this.state.verseVisible&&Object(n.jsx)(S,{updateHaiku:this.updateHaiku,lineNumber:2,line:this.state.line2,totalNumSyllables:7,changeVerseVisible:this.changeVerseVisible,goToPreviousLine:this.goToPreviousLine}),3===this.state.verseVisible&&Object(n.jsx)(S,{updateHaiku:this.updateHaiku,lineNumber:3,line:this.state.line3,totalNumSyllables:5,startAgain:this.startAgain,changeVerseVisible:this.changeVerseVisible,goToPreviousLine:this.goToPreviousLine}),this.state.verseVisible<4&&this.state.verseVisible>0&&Object(n.jsx)(w,{line1:this.state.line1,line2:this.state.line2,line3:this.state.line3,active:this.state.verseVisible}),4===this.state.verseVisible&&Object(n.jsx)(N,{line1:this.state.line1,line2:this.state.line2,line3:this.state.line3}),this.state.verseVisible<=4&&this.state.verseVisible>0&&Object(n.jsx)(C,{allHaikus:this.state.allHaikus,getHaikus:this.getHaikus})]}),Object(n.jsx)(H,{})]})}}]),s}(r.Component),P=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,56)).then((function(t){var s=t.getCLS,n=t.getFID,r=t.getFCP,i=t.getLCP,a=t.getTTFB;s(e),n(e),r(e),i(e),a(e)}))};l.a.render(Object(n.jsx)(i.a.StrictMode,{children:Object(n.jsx)(I,{})}),document.getElementById("root")),P()}},[[55,1,2]]]);
//# sourceMappingURL=main.162fa64a.chunk.js.map