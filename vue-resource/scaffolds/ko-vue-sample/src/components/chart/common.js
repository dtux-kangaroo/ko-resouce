import walden from '../../constants/walden'
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

echarts.registerTheme('walden',walden);

export default echarts;
