import http from '@/utils/http'
import reqUrl from './reqUrl'
export default {
  async getHomeData(param){
    let ret= await http.get(reqUrl.getHomeData, param);
    return ret;
  },
  async getUserData(param){
    let ret= await http.get(reqUrl.getUserData, param);
    return ret;
  },
  async getNavData(param){
    let ret= await http.get(reqUrl.getNavData, param);
    return ret;
  }
}
