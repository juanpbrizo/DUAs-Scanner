const newUid = () => {
  let uid = Date.now().toString(32) + Math.random().toString(32).substring(2)
  uid = uid.split(' ').join('')
  // console.log({uid});
  return uid
}

export default newUid
