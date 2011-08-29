var WBTopTray = (function() {
	var j = (function() {
		var T = {
			dependCacheList : {},
			importCacheStore : {},
			importCacheList : [],
			jobsCacheList : []
		};
		var P = {};
		var Q = 1;
		var M = "";
		var R = [];
		var S = function(Y, W) {
			var aa = Y.split(".");
			var Z = P;
			for(var X = 0, V = aa.length; X < V; X += 1) {
				if(X == V - 1) {
					if(Z[aa[X]] !== undefined) {
						throw Y + "has been register!!!"
					}
					Z[aa[X]] = W(P);
					return true
				}
				if(Z[aa[X]] === undefined) {
					Z[aa[X]] = {}
				}
				Z = Z[aa[X]]
			}
		};
		var O = function(X) {
			var Y = X.split(".");
			var Z = P;
			for(var W = 0, V = Y.length; W < V; W += 1) {
				if(Z[Y[W]] === undefined) {
					return false
				}
				Z = Z[Y[W]]
			}
			return true
		};
		var e = function() {
			for(var W in T.dependCacheList) {
				var X = true;
				for(var Y = 0, V = T.dependCacheList[W]["depend"].length; Y < V; Y += 1) {
					if(!O(T.dependCacheList[W]["depend"][Y])) {
						X = false;
						break
					}
				}
				if(X) {
					S.apply(P, T.dependCacheList[W]["args"]);
					delete T.dependCacheList[W];
					setTimeout(function() {e()
					}, 25)
				}
			}
		};
		var U = function(V) {
			if( typeof V === "string") {
				return document.getElementById(V)
			} else {
				return V
			}
		};
		var N = function(V, Y, X) {
			var W = U(V);
			if(W == null) {
				return
			}
			Y = Y || "click";
			if(( typeof X).toLowerCase() != "function") {
				return
			}
			if(W.attachEvent) {
				W.attachEvent("on" + Y, X)
			} else {
				if(W.addEventListener) {
					W.addEventListener(Y, X, false)
				} else {
					W["on" + Y] = X
				}
			}
		};
		P.inc = function(Y, X) {
			if(!T.importCacheList) {
				T.importCacheList = []
			}
			for(var W = 0, V = T.importCacheList.length; W < V; W += 1) {
				if(T.importCacheList[W] === Y) {
					if(!X) {
						T.importCacheList.push(Y)
					}
					return false
				}
			}
			if(!X) {
				T.importCacheList.push(Y)
			}
			T.importCacheStore[Y] = false;
			var Z = document.createElement("SCRIPT");
			Z.setAttribute("type", "text/javascript");
			Z.setAttribute("src", M + Y.replace(/\./ig, "/") + ".js");
			Z.setAttribute("charset", "utf-8");
			Z[P.IE ? "onreadystatechange" : "onload"] = function() {
				if(!P.IE || this.readyState.toLowerCase() == "complete" || this.readyState.toLowerCase() == "loaded") {
					Q = T.importCacheList.length;
					T.importCacheStore[Y] = true;
					e()
				}
			};
			document.getElementsByTagName("HEAD")[0].appendChild(Z)
		};
		P.register = function(X, W, V) {
			T.dependCacheList[X] = {
				args : arguments,
				depend : T.importCacheList.slice(Q, T.importCacheList.length),
				"short" : V
			};
			Q = T.importCacheList.length;
			e()
		};
		P.regShort = function(V, W) {
			if(P[V] !== undefined) {
				throw V + ":show has been register"
			}
			P[V] = W
		};
		P.setBaseURL = function(V) {
			M = V
		};
		P.getErrorInfo = function() {
			return R
		};
		P.IE = /msie/i.test(navigator.userAgent);
		P.E = U;
		P.C = function(V) {
			var W;
			V = V.toUpperCase();
			if(V == "TEXT") {
				W = document.createTextNode("")
			} else {
				if(V == "BUFFER") {
					W = document.createDocumentFragment()
				} else {
					W = document.createElement(V)
				}
			}
			return W
		};
		P.Ready = (function() {
			var W = [];
			var V = false;
			var X = function() {
				if(V == true) {
					return
				}
				V = true;
				for(var Z = 0, Y = W.length; Z < Y; Z++) {
					if(( typeof W[Z]).toLowerCase() == "function") {
						W[Z].call()
					}
				}
				W = []
			};
			if(document.attachEvent && window == window.top) {(function() {
					try {
						document.documentElement.doScroll("left")
					} catch(Y) {setTimeout(arguments.callee, 0);
						return
					}X()
				})()
			} else {
				if(document.addEventListener) {N(document, "DOMContentLoaded", X)
				} else {
					if(/WebKit/i.test(navigator.userAgent)) {(function() {
							if(/loaded|complete/.test(document.readyState.toLowerCase())) {X();
								return
							}setTimeout(arguments.callee, 25)
						})()
					}
				}
			}N(window, "load", X);
			return function(Y) {
				if(V == true || (/loaded|complete/).test(document.readyState.toLowerCase())) {
					if(( typeof Y).toLowerCase() == "function") {
						Y.call()
					}
				} else {
					W.push(Y)
				}
			}
		})();
		return P
	})();
	$Import = j.inc;
	j.register("core.util.browser", function(N) {
		var M = navigator.userAgent.toLowerCase();
		var e = {
			IE : /msie/.test(M),
			OPERA : /opera/.test(M),
			MOZ : /gecko/.test(M),
			IE5 : /msie 5 /.test(M),
			IE55 : /msie 5.5/.test(M),
			IE6 : /msie 6/.test(M),
			IE7 : /msie 7/.test(M),
			SAFARI : /safari/.test(M)
		};
		return e
	});
	j.register("core.util.storage", function(N) {
		var M = window.localStorage;
		if(window.ActiveXObject) {
			b = document.documentElement;
			STORE_NAME = "localstorage";
			try {
				b.addBehavior("#default#userdata");
				b.save("localstorage")
			} catch(O) {
			}
			return {
				set : function(P, Q) {
					try {
						b.setAttribute(P, Q);
						b.save(STORE_NAME)
					} catch(R) {
					}
				},
				get : function(P) {
					try {
						b.load(STORE_NAME);
						return b.getAttribute(P)
					} catch(Q) {
						return ""
					}
				},
				del : function(P) {
					try {
						b.removeAttribute(P);
						b.save(STORE_NAME)
					} catch(Q) {
					}
				}
			}
		} else {
			if(M) {
				return {
					get : function(e) {
						return M.getItem(e) == null ? null : unescape(M.getItem(e))
					},
					set : function(e, P, Q) {
						M.setItem(e, escape(P))
					},
					del : function(e) {
						M.removeItem(e)
					},
					clear : function() {
						M.clear()
					},
					getAll : function() {
						var e = M.length, Q = null, R = [];
						for(var P = 0; P < e; P++) { Q = M.key(P), R.push(Q + "=" + this.getKey(Q))
						}
						return R.join("; ")
					}
				}
			} else {
				return {
					get : function(S) {
						var Q = document.cookie.split("; "), P = Q.length, e = [];
						for(var R = 0; R < P; R++) {
							e = Q[R].split("=");
							if(S === e[0]) {
								return unescape(e[1])
							}
						}
						return null
					},
					set : function(e, P, Q) {
						if(!(Q && typeof Q === date)) { Q = new Date(), Q.setDate(Q.getDate() + 1)
						}
						document.cookie = e + "=" + escape(P) + "; expires=" + Q.toGMTString()
					},
					del : function(e) {
						document.cookie = e + "=''; expires=Fri, 31 Dec 1999 23:59:59 GMT;"
					},
					clear : function() {
						var Q = document.cookie.split("; "), P = Q.length, e = [];
						for(var R = 0; R < P; R++) {
							e = Q[R].split("=");
							this.deleteKey(e[0])
						}
					},
					getAll : function() {
						return unescape(document.cookie.toString())
					}
				}
			}
		}
	});
	j.register("core.dom.position", function(e) {
		return function(M) {
			if(M == document.body) {
				return false
			}
			if(M.parentNode == null) {
				return false
			}
			if(M.offsetParent == null) {
				return false
			}
			if(M.style.display == "none") {
				return false
			}
			var N = null, T = [], O;
			var Q, R, P, S;
			if(M.getBoundingClientRect) {
				O = M.getBoundingClientRect();
				Q = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
				R = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
				return {
					l : parseInt(O.left + R, 10) || 0,
					t : parseInt(O.top + Q, 10) || 0
				}
			} else {
				if(document.getBoxObjectFor) {
					O = document.getBoxObjectFor(M);
					P = (M.style.borderLeftWidth) ? parseInt(M.style.borderLeftWidth, 10) : 0;
					S = (M.style.borderTopWidth) ? parseInt(M.style.borderTopWidth, 10) : 0;
					T = [O.x - P, O.y - S]
				} else {
					T = [M.offsetLeft, M.offsetTop];
					N = M.offsetParent;
					if(N != M) {
						while(N) {
							T[0] += N.offsetLeft;
							T[1] += N.offsetTop;
							N = N.offsetParent
						}
					}
					if(e.core.util.browser.OPERA != -1 || (e.core.util.browser.SAFARI != -1 && M.style.position == "absolute")) {
						T[0] -= document.body.offsetLeft;
						T[1] -= document.body.offsetTop
					}
				}
			}
			if(M.parentNode) {
				N = M.parentNode
			} else {
				N = null
			}
			while(N && !/^body|html$/i.test(N.tagName)) {
				if(N.style.display.search(/^inline|table-row.*$/i)) {
					T[0] -= N.scrollLeft;
					T[1] -= N.scrollTop
				}
				N = N.parentNode
			}
			return {
				l : parseInt(T[0], 10),
				t : parseInt(T[1], 10)
			}
		}
	});
	j.register("core.evt.addEvent", function(e) {
		return function(M, P, O) {
			var N = e.E(M);
			if(N == null) {
				return false
			}
			P = P || "click";
			if(( typeof O).toLowerCase() != "function") {
				return
			}
			if(N.attachEvent) {
				N.attachEvent("on" + P, O)
			} else {
				if(N.addEventListener) {
					N.addEventListener(P, O, false)
				} else {
					N["on" + P] = O
				}
			}
			return true
		}
	});
	j.register("core.obj.parseParam", function(e) {
		return function(O, N, M) {
			var P;
			if( typeof N != "undefined") {
				for(P in O) {
					if(N[P] != null) {
						if(M) {
							if(O.hasOwnProperty[P]) {
								O[P] = N[P]
							}
						} else {
							O[P] = N[P]
						}
					}
				}
			}
			return O
		}
	});
	j.register("core.dom.removeNode", function(e) {
		return function(M) {
			M = e.E(M) || M;
			try {
				M.parentNode.removeChild(M)
			} catch(N) {
			}
		}
	});
	j.register("core.dom.getElementsByAttr", function(e) {
		return function(Q, N, R) {
			var O = [];
			for(var P = 0, M = Q.childNodes.length; P < M; P++) {
				if(Q.childNodes[P].nodeType == 1) {
					if(Q.childNodes[P].getAttribute(N) == R) {
						O.push(Q.childNodes[P])
					}
					if(Q.childNodes[P].childNodes.length > 0) {
						O = O.concat(arguments.callee.call(null, Q.childNodes[P], N, R))
					}
				}
			}
			return O
		}
	});
	j.register("core.util.getUniqueKey", function(e) {
		return function() {
			return Math.floor(Math.random() * 1000) + new Date().getTime().toString()
		}
	});
	j.register("core.str.parseURL", function(e) {
		return function(O) {
			var N = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
			var S = ["url", "scheme", "slash", "host", "port", "path", "query", "hash"];
			var Q = N.exec(O);
			var R = {};
			for(var P = 0, M = S.length; P < M; P += 1) {
				R[S[P]] = Q[P] || ""
			}
			return R
		}
	});
	j.register("core.arr.isArray", function(e) {
		return function(M) {
			return Object.prototype.toString.call(M) === "[object Array]"
		}
	});
	j.register("core.str.trim", function(e) {
		return function(M) {
			if( typeof M !== "string") {
				throw "trim need a string as parameter"
			}
			if( typeof M.trim === "function") {
				return M.trim()
			} else {
				return M.replace(/^(\u3000|\s|\t|\u00A0)*|(\u3000|\s|\t|\u00A0)*$/g, "")
			}
		}
	});
	j.register("core.json.queryToJson", function(e) {
		return function(N, R) {
			var Q = e.core.str.trim(N).split("&");
			var O = {};
			var S = function(T) {
				if(R) {
					return decodeURIComponent(T)
				} else {
					return T
				}
			};
			for(var P = 0, M = Q.length; P < M; P++) {
				if(Q[P]) {
					_hsh = Q[P].split("=");
					_key = _hsh[0];
					_value = _hsh[1];
					if(_hsh.length < 2) {
						_value = _key;
						_key = "$nullName"
					}
					if(!O[_key]) {
						O[_key] = S(_value)
					} else {
						if(e.core.arr.isArray(O[_key]) != true) {
							O[_key] = [O[_key]]
						}
						O[_key].push(S(_value))
					}
				}
			}
			return O
		}
	});
	j.register("core.json.jsonToQuery", function(e) {
		return function(R, O) {
			var S = [];
			var Q = function(T) {
				T = T == null ? "" : T;
				T = e.core.str.trim(T.toString());
				if(O) {
					return encodeURIComponent(T)
				} else {
					return T
				}
			};
			if( typeof R == "object") {
				for(var N in R) {
					if(R[N] instanceof Array) {
						for(var P = 0, M = R[N].length; P < M; P++) {
							S.push(N + "=" + Q(R[N][P]))
						}
					} else {
						if( typeof R[N] != "function") {
							S.push(N + "=" + Q(R[N]))
						}
					}
				}
			}
			if(S.length) {
				return S.join("&")
			} else {
				return ""
			}
		}
	});
	j.register("core.util.URL", function(e) {
		return function(O) {
			var N = {};
			var Q = e.core.str.parseURL(O);
			var M = e.core.json.queryToJson(Q.query);
			var P = e.core.json.queryToJson(Q.hash);
			N.setParam = function(R, S) {
				M[R] = S;
				return this
			};
			N.getParam = function(R) {
				return M[R]
			};
			N.setParams = function(S) {
				for(var R in S) {
					N.setParam(R, S[R])
				}
				return this
			};
			N.setHash = function(R, S) {
				P[R] = S;
				return this
			};
			N.getHash = function(R) {
				return P[R]
			};
			N.valueOf = N.toString = function() {
				var R = [];
				var S = e.core.json.jsonToQuery(M);
				var T = e.core.json.jsonToQuery(P);
				if(Q.scheme != "") {
					R.push(Q.scheme + ":");
					R.push(Q.slash)
				}
				if(Q.host != "") {
					R.push(Q.host);
					R.push(Q.port)
				}
				R.push("/");
				R.push(Q.path);
				if(S != "") {
					R.push("?" + S)
				}
				if(T != "") {
					R.push("#" + T)
				}
				return R.join("")
			};
			return N
		}
	});
	j.register("core.io.scriptLoader", function(e) {
		var M = {};
		return function(R) {
			var P, N;
			var O = {
				url : "",
				charset : "UTF-8",
				timeout : 30 * 1000,
				args : {},
				onComplete : null,
				onTimeout : null,
				uniqueID : null
			};
			e.core.obj.parseParam(O, R);
			if(O.url == "") {
				throw "scriptLoader: url is null"
			}
			var Q = O.uniqueID || e.core.util.getUniqueKey();
			P = M[Q];
			if(P != null && e.IE != true) {
				e.core.dom.removeNode(P);
				P = null
			}
			if(P == null) {
				P = M[Q] = e.C("script")
			}
			P.charset = O.charset;
			P.id = "scriptRequest_script_" + Q;
			P.type = "text/javascript";
			if(O.onComplete != null) {
				if(e.IE) {
					P.onreadystatechange = function() {
						if(P.readyState.toLowerCase() == "loaded" || P.readyState.toLowerCase() == "complete") {clearTimeout(N);
							O.onComplete()
						}
					}
				} else {
					P.onload = function() {clearTimeout(N);
						O.onComplete()
					}
				}
			}
			P.src = j.core.util.URL(O.url).setParams(O.args);
			document.getElementsByTagName("head")[0].appendChild(P);
			if(O.timeout > 0 && O.onTimeout != null) {
				N = setTimeout(function() {
					O.onTimeout()
				}, O.timeout)
			}
			return P
		}
	});
	j.register("core.io.jsonp", function(e) {
		return function(Q) {
			var O = {
				url : "",
				charset : "UTF-8",
				timeout : 30 * 1000,
				args : {},
				onComplete : null,
				onTimeout : null,
				responseName : null,
				varkey : "callback"
			};
			var R = -1;
			e.core.obj.parseParam(O, Q);
			var P = O.responseName || ("STK_" + e.core.util.getUniqueKey());
			O.args[O.varkey] = P;
			var M = O.onComplete;
			var N = O.onTimeout;
			window[P] = function(S) {
				if(R != 2 && M != null) {
					R = 1;
					M(S)
				}
			};
			O.onComplete = null;
			O.onTimeout = function() {
				if(R != 1 && N != null) {
					R = 2;
					N()
				}
			};
			return e.core.io.scriptLoader(O)
		}
	});
	j.register("core.obj.isEmpty", function(e) {
		return function(P, O) {
			var N = true;
			for(var M in P) {
				if(O) {
					N = false;
					break
				} else {
					if(P.hasOwnProperty(M)) {
						N = false;
						break
					}
				}
			}
			return N
		}
	});
	j.register("core.str.encodeHTML", function(e) {
		return function(M) {
			if( typeof M !== "string") {
				throw "encodeHTML need a string as parameter"
			}
			return M.replace(/\&/g, "&amp;").replace(/"/g, "&quot;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\'/g, "&#39").replace(/\u00A0/g, "&nbsp;").replace(/(\u0020|\u000B|\u2028|\u2029|\f)/g, "&#32")
		}
	});
	j.register("core.str.byteLength", function(e) {
		return function(N) {
			if( typeof N == "undefined") {
				return 0
			}
			var M = N.match(/[^\x00-\x80]/g);
			return (N.length + (!M ? 0 : M.length))
		}
	});
	j.register("core.str.leftB", function(e) {
		return function(Q, M, N) {
			var O = Q.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
			var P = e.core.str.byteLength(Q) > M ? N || "" : "";
			Q = Q.slice(0, O.slice(0, M).replace(/\*\*/g, " ").replace(/\*/g, "").length);
			if(e.core.str.byteLength(Q) > M) {
				Q = Q.slice(0, Q.length - 1) + P
			}
			return Q + P
		}
	});
	j.register("core.util.templet", function(e) {
		return function(M, N) {
			return M.replace(/#\{(.+?)\}/ig, function() {
				var R = arguments[1].replace(/\s/ig, "");
				var P = arguments[0];
				var S = R.split("||");
				for(var Q = 0, O = S.length; Q < O; Q += 1) {
					if(/^default:.*$/.test(S[Q])) {
						P = S[Q].replace(/^default:/, "");
						break
					} else {
						if(N[S[Q]] !== undefined) {
							P = N[S[Q]];
							break
						}
					}
				}
				return P
			})
		}
	});
	j.register("core.util.cookie", function(M) {
		var e = {
			set : function(Q, T, S) {
				var N = [];
				var R, P;
				var O = {
					expire : null,
					path : null,
					domain : null,
					secure : null,
					encode : true
				};
				M.core.obj.parseParam(O, S);
				if(O.encode == true) {
					T = escape(T)
				}
				N.push(Q + "=" + T);
				if(O.path != null) {
					N.push("path=" + O.path)
				}
				if(O.domain != null) {
					N.push("domain=" + O.domain)
				}
				if(O.secure != null) {
					N.push(O.secure)
				}
				if(O.expire != null) {
					R = new Date();
					P = R.getTime() + O.expire * 3600000;
					R.setTime(P);
					N.push("expires=" + R.toGMTString())
				}
				document.cookie = N.join(";")
			},
			get : function(P) {
				P = P.replace(/([\.\[\]\$])/g, "\\$1");
				var O = new RegExp(P + "=([^;]*)?;", "i");
				var Q = document.cookie + ";";
				var N = Q.match(O);
				if(N) {
					return N[1] || ""
				} else {
					return ""
				}
			},
			remove : function(N, O) {
				O = O || {};
				O.expire = -10;
				e.set(N, "", O)
			}
		};
		return e
	});
	try {
		window.external.msSiteModeClearIconOverlay()
	} catch(I) {
	}
	var H = '<style type="text/css">@media screen and (-webkit-min-device-pixel-ratio:0){.tsina_gnb{top:8px;}.tsina_gnb ul li.on a{margin-bottom:-1px; padding:2px 5px 10px 7px;}.tsina_gnb ul.sltmenu{top:26px;}.tsina_gnb ul.sltmenu li a{margin:0 2px; padding:4px 13px 3px;}.tsina_gnb ul li em.nmTxt,.tsina_gnb ul li a{font-family:inherit;}}.top_yellowtip{position:fixed;top:30px;_position:relative;_top:0;width:100%;z-index:2000;}.re_top{top:0;}</style><div class="tsina_gnbarea" id="#{box}" ></div><div class="small_Yellow_div tsina_gnb re_top"><div id="#{once_layer}" class="eventTip" style="left:64px;display:none;"></div></div><div id="#{unread_yellowtip}" class="top_yellowtip"><div class="small_Yellow_div tsina_gnb re_top"><div style="display:none" class="small_Yellow" id="#{unread_layer}"><table class="CP_w"><thead><tr><th class="tLeft"><span></span></th><th class="tMid"><span></span></th><th class="tRight"><span></span></th></tr></thead><tbody><tr><td class="tLeft"><span></span></td><td class="tMid"><a href="javascript:;" onfocus="(function(){var div = document.getElementById(\'#{unread_comm}\');var parent = div.parentNode;if(parent){parent.focus();}})();return false;" style="position:absolute;top:-9797em;" accesskey="4">新消息</a><div class="yInfo"><!--<span id="#{unread_title}"></span>--><p id="#{unread_comm}"></p><p id="#{unread_fans}"></p><p id="#{unread_msg}"></p><p id="#{unread_atme}"></p><p id="#{unread_group}"></p><p id="#{unread_notice}"></p><p id="#{unread_invite}"></p><p id="#{unread_photo}"></p><div id="#{unread_source}"></div></div></td><td class="tRight"><span></span></td></tr></tbody><tfoot><tr><td class="tLeft"><span></span></td><td class="tMid"><span></span></td><td class="tRight"><span></span></td></tr></tfoot></table><div class="close"><a href="javascript:void(0)" id="#{unread_layer_close}">&nbsp;</a></div></div></div></div>';
	var D = '<a class="closeset" href="javascript:void(0);" id="#{once_close}"></a><p> 来<a href="http://game.weibo.com/weicity?origin=1033">微城市</a>建造你的微博大厦</p>';
	var K = '<div class="bg_gnbarea">&nbsp;</div><div id = #{weiboTop} class="tsina_gnb"><ul class="gnb_l"><li><a href="http://weibo.com/?source=toptray">${微博}</a> </li><li><a href="http://weibo.com/pub/?source=toptray" id="#{square}" class="nohover">${广场}<span class="arr_d"><em class="b1">&nbsp;</em><em class="b2">&nbsp;</em><em class="b3">&nbsp;</em></span></a> <ul class="sltmenu" id="#{square_layer}" style="display:none">#{square_list}</ul></li><li><a id="#{microGroup}" href="http://q.weibo.com/?topnav_v3">${微群}</a> </li><!--li><a href="http://event.weibo.com">${活动}</a> </li><li><a href="http://vote.weibo.com?source=toptray">${投票}</a> </li--><li><a href="http://weibo.com/app" id="#{application}" class="nohover">${应用}<span class="arr_d"><em class="b1">&nbsp;</em><em class="b2">&nbsp;</em><em class="b3">&nbsp;</em></span></a> <ul class="sltmenu appmenu appmenu_s" id="#{application_layer}" style="display:none">                <li class="appmenu_list"><dl id =#{appList}><div style="text-align:center;" ><img height="16" width="16" src="http://img.t.sinajs.cn/t35/style/images/common/loading.gif" alt="" title=""><p>正在加载，请稍候...</p></div></dl></li>                <li class="appmenu_line"><ul class="sltmenu"></ul></li>                <li class="appmenu_more"><div id=#{myMoreApp} style="display:none;"><span><a href="http://account.weibo.com/setting/connections?source=toptray">${设置}</a></span><ul><li class="line">|</li></ul><a href="http://weibo.com/app?source=toptrays">${更多}</a></div><a id=#{moreApp} style="display:none;" href="http://weibo.com/app?source=toptray" >${更多应用}<em>&gt;&gt;</em></a></li></ul></li><li><a href="http://game.weibo.com/?origin=2301" id="#{game}" class="nohover">${游戏}<span class="arr_d"><em class="b1">&nbsp;</em><em class="b2">&nbsp;</em><em class="b3">&nbsp;</em></span></a> <ul class="sltmenu appmenu appmenu_s" id="#{game_layer}" style="display:none"><div style="text-align:center;" ><img height="16" width="16" src="http://img.t.sinajs.cn/t35/style/images/common/loading.gif" alt="" title=""><p>正在加载，请稍候...</p></div></ul></li><li><a href="http://weibo.com/mobile/wap?source=toptray">${手机}</a> </li><li><a href="http://weibo.com/findfriends">${找人}</a> </li>#{operation}</ul><ul class="gnb_r"><li><a href="http://weibo.com/#{uid}/profile/" id="#{name_span}">#{name}</a> </li><li><a href="http://weibo.com/plugins/imbot/myim.php?source=toptray">${工具}</a> </li><li><a href="http://weibo.com/messages?source=toptray">${私信}</a> </li><li><a href="http://weibo.com/systemnotice">${通知}</a> </li><li><a href="http://account.weibo.com/setting/user?source=toptray">${帐号设置}</a> </li><li class="line">|</li><li><a id="#{logout}" href="http://weibo.com/logout.php?backurl=/">${退出}</a> </li></ul></div>';
	var f = '<div class="bg_gnbarea">&nbsp;</div><div class="tsina_gnb"><ul class="gnb_l"><li><a href="http://weibo.com/?source=toptray">${微博}</a> </li><li><a href="http://weibo.com/pub/?source=toptray" id="#{square}" class="nohover">${广场}<span class="arr_d"><em class="b1">&nbsp;</em><em class="b2">&nbsp;</em><em class="b3">&nbsp;</em></span></a> <ul class="sltmenu" id="#{square_layer}" style="display:none">#{square_list}</ul></li><li><a id="#{microGroup}" href="http://q.weibo.com/?topnav_v3">${微群}</a> </li><!--li><a href="http://event.weibo.com">${活动}</a> </li><li><a href="http://vote.weibo.com?source=toptray">${投票}</a> </li--><li><a href="http://weibo.com/app" id="#{application}">${应用}<!--span class="arr_d"><em class="b1">&nbsp;</em><em class="b2">&nbsp;</em><em class="b3">&nbsp;</em></span--></a> <!--ul class="sltmenu appmenu appmenu_s" id="#{application_layer}">                <li class="appmenu_list">                    <dl>                    <dt><a href="http://vote.weibo.com?source=toptray"><img alt="活动" src="http://ww1.sinaimg.cn/square/76256a29jw6df29sl4d4ij.jpg">投票</a></dt>                    <dt><a href="http://event.weibo.com"><img alt="活动" src="http://ww1.sinaimg.cn/square/76256a29jw6df29sl4d4ij.jpg">活动</a></dt>                    </dl>                </li>                <li class="appmenu_line"><ul class="sltmenu"></ul></li>                <li class="appmenu_more"><a href="http://weibo.com/app?source=weibo_home_nav_app_all">更多应用</a></li>            </ul--></li><li><a href="http://weibo.com/mobile/wap?source=toptray">${手机}</a> </li>#{operation}</ul><ul class="gnb_r"><li><em class="nmTxt">${还没有微博帐号}？</em> </li><li><a href="http://weibo.com/signup/signup.php?ps=u3&lang=zh&inviteCode=#{inviteCode||default:}" target="_blank" class="reg"><span>${注册}</span></a> </li><li class="line">|</li><li><a href="http://weibo.com/login.php" target="_blank"><strong>${登录}</strong></a> </li></ul></div>';
	var l = '  <li><a href="http://weibo.com/pub/star?source=toptray">${名人堂}</a></li>    <li><a href="http://weibo.com/pub/top">${风云榜}</a></li>    <li><a href="http://weibo.com/pub/topic">${微话题}</a></li>       <li><a href="http://talk.weibo.com">${微访谈}</a></li>         <li><a href="http://live.weibo.com">${微直播}</a></li>         <li><a href="http://club.weibo.com/?source=toptray">${微博达人}</a></li> <li><a href="http://weibo.com/pub/news?source=toptray">${随便看看}</a></li>    <li><a href="http://weibo.com/pub/city?source=toptray">${同城微博}</a></li>  <li><a href="http://weibo.com/pub/topmblog?type=re&act=day&source=toptray">${热门转发}</a></li>     <li><a href="http://weibo.com/pub/sofa?source=toptray">${抢个沙发}</a></li> <li><a href="http://weibo.com/pub/i/fun?source=toptray">${有趣的人}</a></li>    <li><a href="http://weibo.com/pub/hottags?source=toptray">${标签找人}</a></li>  <li><a href="http://screen.weibo.com">${大屏幕}</a></li>';
	var u = j;
	var w = {};
	var q = (new Date()).getTime();
	var p = {};
	var z = {
		unreadChange : null,
		breath : null
	};
	var b = {};
	var v = function(e) {
		return ("WB_" + e + "_" + q)
	};
	var i = function(e) {
		return u.E("WB_" + e + "_" + q)
	};
	var t = function(e, M) {
		if(M[e]) {
			return M[e]
		}
		return e
	};
	var E = function(e, M) {
		if(!M) {
			M = {}
		}
		return e.replace(/\$\{([^\}]+)\}/ig, function() {
			var N = arguments[1].replace(/\s/ig, "");
			return t(N, M)
		})
	};
	var m = function(V) {
		var S = V.act;
		var O = V.ext || [];
		var U = false;
		var M = null;
		var N = function() {
			if(U) {
				V.fun(U)
			}
		};
		var Q = function() {
			if(!U) {
				V.fun(U)
			}
		};
		var T = function() {
			U = true;
			if(M) {clearTimeout(M)
			}
			M = setTimeout(N, 100)
		};
		var e = function() {
			U = false;
			if(M) {clearTimeout(M)
			}
			M = setTimeout(Q, 100)
		};
		u.core.evt.addEvent(S, "mouseover", T);
		u.core.evt.addEvent(S, "mouseout", e);
		for(var P = 0, R = O.length; P < R; P += 1) {
			u.core.evt.addEvent(O[P], "mouseover", T);
			u.core.evt.addEvent(O[P], "mouseout", e)
		}
	};
	var y = function(e, M, O, N) {
		return function(P) {
			if(P) {
				e.parentNode.className = "on";
				M.style.display = "";
				O && O(true);
				if(e && !e.ready) {
					e.ready = true;
					N && N()
				}
			} else {
				M.style.display = "none";
				e.parentNode.className = "";
				O && O(false)
			}
		}
	};
	var a;
	var A = true;
	var s = null;
	var c = false;
	var d = false;
	var G = {
		comment : 1,
		attention : 1,
		msg : 1,
		atme : 1,
		group : 1,
		notice : 1,
		invite : 1,
		photo : 0
	};
	var k = function() {
		try {
			if(!u.core.util.cookie.get("WNP".toUpperCase())) {
				return false
			}
			var M = 7, Q, O = ((decodeURIComponent(u.core.util.cookie.get("WNP".toUpperCase())).split(",")[1]) * 1).toString(2);
			O = ((new Array(M - O.length)).join("0") + O).split("");
			for(var N in G) {
				Q = O.pop();
				G[N] = Q
			}
		} catch(P) {
		}
	};
	var g = {
		tip : null,
		loop : null,
		isRun : false,
		mint : 200,
		maxt : 2000,
		nav : 30,
		top : 0,
		otop : 0,
		init : function(e) {
			g.tip = e;
			g.top = u.core.dom.position(i("box")).t;
			g.otop = g.getTop();
			!g.isRun && g.start()
		},
		stop : function() {
			g.isRun = false;
			clearInterval(g.loop)
		},
		start : function() {
			g.isRun = true;
			if(!g.loop) {
				var e, M, P = g.mint, O = g.top, N = g.nav;
				g.loop = setInterval(function() {
					var Q = g.getTop();
					if(u.core.util.browser.IE6) {M != Q && ( M = Q < (O + N) ? 0 : Q - O - N);
						if(g.otop != Q) {
							g.otop = Q;
							g.tip.style.display = "none";
							P = g.maxt
						} else {
							g.tip.style.display = "";
							P = g.mint
						}
					} else {
						M = Q < (O + N) ? (O - Q + N) : 0
					}
					g.tip.style.top = M + "px"
				}, g.mint)
			}
		},
		getTop : function(N) {
			N = N || document;
			var e = N.documentElement;
			var M = N.body;
			return Math.max(e.scrollTop, M.scrollTop)
		}
	};
	var x = function(M, e) {
		if(!A) {
			return false
		}
		var U = false, R = 0, O = null, V = "";
		var T = !a ? "http://weibo.com" : "http://www.weibo.com";
		try {
			var S = i("unread_layer");
			if(parseInt(G.comment) && M.comment > 0) {
				V = T + "/comments";
				i("unread_comm").innerHTML = E(M.comment + '${条新评论}，<a href="' + V + '">${查看评论}</a>', p);
				U = true;
				R += M.comment;
				i("unread_comm").style.display = ""
			} else {
				i("unread_comm").style.display = "none"
			}
			if(parseInt(G.attention) && M.attention > 0) {
				i("unread_fans").innerHTML = E(M.attention + '${位新粉丝}，<a href="' + (T + "/" + s) + '/fans">${查看我的粉丝}</a>', p);
				U = true;
				R += M.attention;
				i("unread_fans").style.display = ""
			} else {
				i("unread_fans").style.display = "none"
			}
			if(parseInt(G.msg) && M.msg > 0) {
				i("unread_msg").innerHTML = E(M.msg + '${条新私信}，<a href="' + T + '/messages">${查看私信}</a>', p);
				U = true;
				R += M.msg;
				i("unread_msg").style.display = ""
			} else {
				i("unread_msg").style.display = "none"
			}
			if(parseInt(G.atme)) {
				if(M.atme > 0 || M.atcmt > 0) {
					if(M.atme > 0) {
						V = T + "/atme";
						if(M.atme > 0 && M.atcmt > 0) {
							i("unread_atme").innerHTML = E(parseInt(M.atme + M.atcmt) + '${条微博/评论提到我}，<a href="' + V + '">${查看}<em>@</em>${我}</a>', p)
						} else {
							i("unread_atme").innerHTML = E(M.atme + '${条微博提到我}，<a href="' + V + '">${查看}<em>@</em>${我}</a>', p)
						}
					} else {
						if(M.atcmt > 0) {
							V = T + "/mycmtat/mycmtat.php ";
							i("unread_atme").innerHTML = E(M.atcmt + '${条评论提到我}，<a href="' + V + '">${查看}<em>@</em>${我}</a>', p)
						}
					}
					U = true;
					R += parseInt(M.atme + M.atcmt);
					i("unread_atme").style.display = ""
				} else {
					i("unread_atme").style.display = "none"
				}
			} else {
				i("unread_atme").style.display = "none"
			}
			if(parseInt(G.group) && M.group > 0) {
				i("unread_group").innerHTML = E(M.group + '${条群内新消息}，<a href="http://q.weibo.com/message/proxJump.php">${查看消息}</a>', p);
				U = true;
				R += M.group;
				i("unread_group").style.display = ""
			} else {
				i("unread_group").style.display = "none"
			}
			if(parseInt(G.notice) && M.notice > 0) {
				i("unread_notice").innerHTML = E(M.notice + '${条新通知}，<a href="' + T + '/systemnotice">${查看通知}</a>', p);
				U = true;
				R += M.notice;
				i("unread_notice").style.display = ""
			} else {
				i("unread_notice").style.display = "none"
			}
			if(parseInt(G.photo) && M.photo > 0) {
				i("unread_photo").innerHTML = E(M.photo + '${条相册新消息}，<a href="http://photo.new.weibo.com/messages/index">${查看消息}</a>', p);
				U = true;
				R += M.photo;
				i("unread_photo").style.display = ""
			} else {
				i("unread_photo").style.display = "none"
			}
			if(parseInt(G.invite) && M.invite > 0) {
				i("unread_invite").innerHTML = E(M.invite + '${条邀请}，<a href="' + T + '/invite/recv.php?rf=tip">${查看邀请}</a>', p);
				U = true;
				R += M.invite;
				i("unread_invite").style.display = ""
			} else {
				i("unread_invite").style.display = "none"
			}
			if(e && e.html) {
				d = true;
				U = true;
				var N = j.core.dom.getElementsByAttr(i("unread_source"), "SourceId", e.id);
				if(N.length) {
					N[0].innerHTML = e.html;
					N = null
				} else {
					var Q = document.createElement("DIV");
					Q.innerHTML = E(e.html, p);
					Q.setAttribute("SourceId", e.id);
					i("unread_source").appendChild(Q);
					Q = null
				}
				i("unread_source").style.display = ""
			}
			if(U || d) {
				g.init(i("unread_yellowtip"));
				S.style.display = ""
			} else {clearTimeout(O);
				S.style.display = "none"
			}
		} catch(P) {
		}
	};
	var J = function() {
		u.core.io.jsonp({
			url : "http://weibo.com/public/aj_setonline.php?count=" + h,
			onComplete : function() {
			}
		})
	};
	var r = function(e) {
		u.core.io.jsonp({
			url : "http://api.weibo.com/nav/list.json?&category_ids=3,4&source=1740131375&count=" + h,
			onComplete : function(Q) {
				if(Q && Q.categorys.length) {
					try {
						var T = {
							evenNumber : '<dt><a href="#{link}" target="_blank" title="#{name}" onclick="GB_SUDA._S_uaTrack(\'tblog_app_data\',\'toptray:#{id}\') "><img alt="#{name}" src="#{icon}">#{leftBname}</a></dt>',
							system : '<dt><a href="#{link}" title="#{name}"><img alt="#{name}" src="#{icon}">#{leftBname}</a></dt>'
						}, N;
						var M = [{
							name : "${投票}",
							icon : "http://img.t.sinajs.cn/t35/style/images/common/gnbicons/vote.gif",
							link : "http://vote.weibo.com?source=toptray"
						}, {
							name : "${活动}",
							icon : "http://img.t.sinajs.cn/t35/style/images/common/gnbicons/event.gif",
							link : "http://event.weibo.com?source=toptray"
						}, {
							name : "${微电台}",
							icon : "http://img.t.sinajs.cn/t35/style/images/common/gnbicons/radio.gif",
							link : "http://radio.weibo.com?source=toptray"
						}, {
							name : "${音乐}",
							icon : "http://img.t.sinajs.cn/t35/style/images/common/gnbicons/music.gif",
							link : "http://music.sina.com.cn/t/?source=toptray"
						}, {
							name : "${微数据}",
							icon : "http://img.t.sinajs.cn/t35/style/images/common/gnbicons/data.gif",
							link : "http://data.weibo.com/mydata?source=toptray"
						}, {
							name : "${勋章馆}",
							icon : "http://timg.sjs.sinajs.cn/t4/appstyle/medal/images/icon_medal.png",
							link : "http://badge.weibo.com?source=toptray"
						}, {
							name : "${微博桌面}",
							icon : "http://img.t.sinajs.cn/t35/style/images/common/gnbicons/desktop.gif",
							link : "http://desktop.weibo.com/?source=toptray"
						}];
						if(Q.categorys[0].items.length) {
							N = Q.categorys[0].items.slice(0, 10);
							i("myMoreApp").style.display = ""
						} else {
							N = Q.categorys[1].items.slice(0, 10);
							i("moreApp").style.display = ""
						}
						var S = [];
						for(var O = 0; O < M.length; O++) {
							if(/http:\/\/music.sina.com.cn\/t/.test(M[O].link)) {
								M[O].leftBname = j.core.str.leftB(M[O].name = E(M[O].name, p), 8, "...") + E('<em class="gnb_music"><span class="line">|</span><i title="${听歌}" onclick="if(_musicopener){_musicopener.focus();}else{var _musicopener=window.open(\'http://ting.weibo.com\');_musicopener.focus();}return false;">${听歌}</i></em>', p)
							} else {
								M[O].leftBname = j.core.str.leftB(M[O].name = E(M[O].name, p), 8, "...")
							}
							S.push(j.core.util.templet(T.system, M[O]))
						}
						for(var P = 0; P < N.length; P++) {
							N[P].leftBname = j.core.str.leftB(N[P].name = E(N[P].name, p), 8, "...");
							S.push(j.core.util.templet(T.evenNumber, N[P]))
						}
						i("appList").innerHTML = S.join("")
					} catch(R) {
						return ""
					}
				}
			}
		})
	};
	var o = function(M) {
		var e = function(T, S) {
			if(!T || !T.length) {
				return
			}
			var P = T.length > S ? S : T.length;
			var O = [];
			O.push('<li class="appmenu_list"><dl>');
			var R = "", U;
			for(var Q = 0; Q < P; Q++) {
				U = T[Q] || {};
				R = "<dt><a " + (U.name ? 'title="' + U.name + '"' : "") + ' href="' + (U.game_url || "") + '"><img alt="' + (U.name || "") + '" src="' + (U.icon || "") + '">' + (U.name || "") + "</a></dt>";
				O.push(R)
			}
			O.push('</dl></li><li class="appmenu_line"><ul class="sltmenu"></ul></li>');
			O.push('<li class="appmenu_more"><a href="http://game.weibo.com/home/recommend?origin=2302">浏览热门游戏<em>&gt;&gt;</em></a></li>');
			i("game_layer").innerHTML = O.join("");
			O = null
		};
		var N = function() {
			u.core.io.jsonp({
				url : "http://api.weibo.com/2/proxy/game/games/suggestions.json?source=1740131375",
				onComplete : function(O) {
					try {
						if(!O || !O.code || !O.data || !O.data.length) {
							return
						}e(O.data, 4)
					} catch(P) {
					}
				}
			})
		};
		u.core.io.jsonp({
			url : "http://api.weibo.com/2/proxy/game/games.json?source=1740131375",
			onComplete : function(O) {
				try {
					if(!O || !O.code || !O.data || !O.data.games || !O.data.games.length) {N();
						return
					}e(O.data.games, 12)
				} catch(P) {
				}
			}
		})
	};
	var F = function(e) {
		var M = i("once_layer");
		if(!M || M.sleep) {
			return
		}
		if(e) {
			M.style.display = "none"
		} else {
			M.style.display = ""
		}
	};
	var C = function() {m({
			act : i("application"),
			ext : [i("application_layer")],
			fun : y(i("application"), i("application_layer"), F, r)
		});
		m({
			act : i("game"),
			ext : [i("game_layer")],
			fun : y(i("game"), i("game_layer"), F, o)
		})
	};
	var h = 0;
	var L = function(M, e) {
		u.core.io.jsonp({
			url : "http://api.weibo.com/remind/unread_count.json?source=1740131375&count=" + h + "&user_id=" + M + "&_pid=" + (e.pid || "0"),
			onComplete : function(P) {
				var O = {};
				P = P.data;
				x(P);
				if(e.source && e.source.length > 0) {B(e.source, P)
				}
				if(z.breath) {
					try {
						z.breath(P)
					} catch(Q) {
					}
				}
				for(var N in P) {
					if(P[N] !== b[N]) {
						O[N] = P[N]
					}
				}
				if(!u.core.obj.isEmpty(O)) {
					try {
						if(z.unreadChange) {
							z.unreadChange(O)
						}
					} catch(Q) {
					}
				}
				b = P
			}
		});
		h += 1
	};
	var B = function(N, e) {
		if(!N || N.length == 0) {
			return false
		}
		for(var M = 0; M < N.length; M++) {
			u.core.io.jsonp({
				url : N[M].source,
				onComplete : (function(O) {
					return function(Q) {
						var P;
						P = N[O].callback(Q);
						x(e, P);
						P = null
					}
				})(M)
			})
		}
		if(d) {
			i("unread_source").style.display = "";
			d = false
		} else {
			i("unread_source").style.display = "none"
		}
	};
	document.write(u.core.util.templet(H, {
		box : v("box"),
		unread_title : v("unread_title"),
		unread_layer : v("unread_layer"),
		unread_fans : v("unread_fans"),
		unread_comm : v("unread_comm"),
		unread_atme : v("unread_atme"),
		unread_group : v("unread_group"),
		unread_msg : v("unread_msg"),
		unread_notice : v("unread_notice"),
		unread_photo : v("unread_photo"),
		unread_invite : v("unread_invite"),
		unread_source : v("unread_source"),
		unread_layer_close : v("unread_layer_close"),
		once_layer : v("once_layer"),
		once_close : v("once_close"),
		unread_yellowtip : v("unread_yellowtip"),
		once_txt : v("once_txt")
	}));
	var n = function(M) {
		if(!M) {
			return
		}
		var P = i("box");
		if(!P) {
			return
		}
		var e = P.getElementsByTagName("a");
		var O;
		for(var N = 0; N < e.length; N++) {
			O = e[N].href;
			if(O && (O.indexOf("http://weibo.") == 0)) {
				e[N].href = O.replace(/http:\/\/weibo./, "http://www.weibo.")
			}
		}
	};
	w.init = function(M) {
		var N = {
			square : v("square"),
			weiboTop : v("weiboTop"),
			application : v("application"),
			square_layer : v("square_layer"),
			application_layer : v("application_layer"),
			operation : "",
			name_span : v("name_span"),
			square_list : E(M.square || l, M.language),
			account : decodeURIComponent(M.account),
			uid : M.uid || "",
			name : u.core.str.encodeHTML(decodeURIComponent(M.name)),
			logout : v("logout"),
			source : M.source || [],
			application : v("application"),
			appList : v("appList"),
			myMoreApp : v("myMoreApp"),
			moreApp : v("moreApp"),
			game : v("game"),
			game_layer : v("game_layer"),
			microGroup : v("microGroup")
		};
		a = (M.baseurl && (/www.weibo./.test(M.baseurl)));
		s = M.uid;
		if(window.location.search) {
			var P = window.location.search.slice(1);
			var O = u.core.json.queryToJson(P);
			if(O.inviteCode) {
				N.inviteCode = O.inviteCode
			}
		}
		if(M.operation) {
			N.operation = '<li class="line">|</li>' + M.operation
		}
		var e = function(Q) {
			if(!Q) {
				i("once_layer").sleep = true;
				i("once_layer").style.display = "none"
			}
		};
		if(M.isLogin) {
			i("box").innerHTML = u.core.util.templet(E(K, M.language), N);
			if(M.logout) {
				i("logout").href = M.logout
			}
			i("once_layer").innerHTML = E(u.core.util.templet(D, {
				once_close : v("once_close")
			}), M.language);
			i("once_layer").parentNode.style.width = i("weiboTop").offsetWidth + "px";
			i("once_layer").style.left = i("game").parentNode.offsetLeft - 52 + "px";
			if(u.core.util.cookie.get((M.uid || "") + "groupTip") != "1") {
				i("once_layer").style.display = ""
			} else {
				i("once_layer").sleep = true
			}e(false);
			k();
			if(M.closeMsg) {
				G.msg = 0
			}setTimeout(function() {C();
				L(M.uid, M)
			}, 3000);
			setInterval(function() {L(M.uid, M)
			}, 30 * 1000);
			setInterval(function() {J()
			}, 29 * 60 * 1000);
			u.core.evt.addEvent(i("unread_layer_close"), "click", function() {
				g.stop();
				i("unread_layer").style.display = "none";
				A = false;
				u.core.io.scriptLoader({
					url : "http://weibo.com/public/del_unread_all.php"
				});
				if(M.source && M.source.length > 0) {
					for(var Q = 0; Q < M.source.length; Q++) {
						u.core.io.scriptLoader({
							url : M.source[Q].clear
						})
					}
				}
				return false
			});
			u.core.evt.addEvent(i("once_close"), "click", function() {
				u.core.util.cookie.set((M.uid || "") + "groupTip", "1", {
					expire : 168
				});
				i("once_layer").style.display = "none";
				i("once_layer").sleep = true
			})
		} else {e(false);
			i("box").innerHTML = u.core.util.templet(E(f, M.language), N)
		}m({
			act : i("square"),
			ext : [i("square_layer")],
			fun : y(i("square"), i("square_layer"), F)
		});
		p = M.language;
		n(a)
	};
	w.addListener = function(e, M) {
		if( typeof M !== "function") {
			throw "listener need a function as the second parameter"
		}
		z[e] = M
	};
	return w
})();
