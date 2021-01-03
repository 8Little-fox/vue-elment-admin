/**
 * @Description: 递归整理路由数据格式
 * @Author: WenBo Wei
 * @Date: 2020/10/29
 * @param: router 路由数据文件
 */
export function resetFun(router) {
  if (router.length > 0) {
    let routerList = []
    router.map(item => {
      if (item.path !== '*') {
        if (item.children) {
          let childrenPath = getChildrenPath(item.path, item.children)
          routerList.push(...childrenPath)
        } else {
          routerList.push(item.path)
        }
      }
    })
    return routerList
  } else {
    console.log('store->modules->permission,router没数据')
  }
}

function getChildrenPath(path, children) {
  let childrenListPath = []
  children.map(item => {
    if (item.path.includes('http:') || item.path.includes('https:')) return
    if (item.children) {
      let childrenPath = path === '/' ? `/${item.path}` : `${path}/${item.path}`
      let childrenChildrenPath = getChildrenPath(childrenPath, item.children)
      childrenListPath.push(...childrenChildrenPath)
    } else {
      childrenListPath.push(path === '/' ? `/${item.path}` : `${path}/${item.path}`)
    }
  })
  return childrenListPath
}
