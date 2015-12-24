	
		//返回n天前后的时间，格式 ‘yyyy-mm-dd’
		function getDateByStr(yy, mm, dd, prenext,n) {
		    var  d, t, t2;
		    var s = {};
		    t = Date.UTC(yy, mm, dd);

		    t2 = n * 1000 * 3600 * 24; 

		    if (prenext == 'pre') {
		        t-= t2;
		    } else {
		        t+= t2;
		    }
		    d = new Date(t);
		    s.Year = d.getUTCFullYear();
		    s.Month = ("00"+(d.getUTCMonth()+1)).slice(-2) ;
		    s.Day = ("00"+d.getUTCDate()).slice(-2);
		    return s;
		}
		function getDateTimeByStr(str, prenext,n){   
		  var   dd, mm, yy;   
		  var   reg = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
		  if (arr = str.match(reg)) {
		    yy = Number(arr[1]);
		    mm = Number(arr[2])-1;
		    dd = Number(arr[3]);
		  } else {
		    var d = new Date();
		    yy = d.getUTCFullYear();
		    mm = ("00"+(d.getUTCMonth())).slice(-2);
		    dd = ("00"+d.getUTCDate()).slice(-2);
		  }
		 if (prenext == null || (prenext != 'pre' && prenext != 'next')) {
		    var prenext = 'pre';
		  }
		  return getDateByStr(yy, mm, dd, prenext,n);
		} 

		//getDateTimeByStr('2015-2-28', 'next',3);



exports.timecalculation = getDateTimeByStr;
