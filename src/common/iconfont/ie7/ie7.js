/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-qrcode': '&#xe923;',
		'icon-weChat': '&#xe922;',
		'icon-garbage': '&#xe921;',
		'icon-error': '&#xe913;',
		'icon-success': '&#xe920;',
		'icon-game': '&#xe911;',
		'icon-home': '&#xe910;',
		'icon-choumahui': '&#xe909;',
		'icon-biyan': '&#xe900;',
		'icon-succeed': '&#xe901;',
		'icon-checkPending': '&#xe902;',
		'icon-Back': '&#xe903;',
		'icon-persona': '&#xe904;',
		'icon-close': '&#xe905;',
		'icon-bet-result-close': '&#xe906;',
		'icon-guanyu': '&#xe907;',
		'icon-time': '&#xe908;',
		'icon-CCB': '&#xe90a;',
		'icon-BoCom': '&#xe90b;',
		'icon-jiaoyi': '&#xe90c;',
		'icon-Warning': '&#xe90d;',
		'icon-wallet': '&#xe90e;',
		'icon-calendar': '&#xe90f;',
		'icon-shanghaiPF': '&#xe912;',
		'icon-refresh': '&#xe914;',
		'icon-mine': '&#xe915;',
		'icon-Next': '&#xe916;',
		'icon-xiazhu': '&#xe917;',
		'icon-message': '&#xe918;',
		'icon-bankCard': '&#xe919;',
		'icon-CMBC': '&#xe91a;',
		'icon-openEyes': '&#xe91b;',
		'icon-Alipay': '&#xe91c;',
		'icon-BOC': '&#xe91d;',
		'icon-rolloff': '&#xe91e;',
		'icon-Into': '&#xe91f;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
