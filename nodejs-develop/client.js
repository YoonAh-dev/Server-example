console.log("client code running...");

const Axios = require('axios');

const URI = "http://localhost:3000";

// 비효율적인 방법: 
//         - blogsLimit 20일 때: 2초 후반
//         - blogsLimit 50일 때: 4초 중반
// populate 사용하는 방법
//         - blogsLimit 20일 때: 0.8초 후반 
//         - blogsLimit 50일 때: 1초 초반
//         - blogsLimit 200일 때: 2초 후반
// nesting 사용하는 방법
//         - blogsLimit 20일 때: 0.4초 후반
//         - blogsLimit 50일 때: 0.8초 초반
//         - blogsLimit 200일 때: 2초 후반

const test = async () => {
    console.time("loading time: ")
    await Axios.get(`${URI}/blog`);
    // console.dir(blogs[3], {depth: 10});
    // blogs = await Promise.all(
    //     blogs.map(async blog => {
    //         const [res1, res2] = await Promise.all([
    //             Axios.get(`${URI}/user/${blog.user}`), Axios.get(`${URI}/blog/${blog._id}/comment`)
    //         ]) 
    //         blog.user = res1.data.user;
    //         blog.comments = await Promise.all(
    //             res2.data.comments.map(async comment => {
    //                 const { data: { user } } = await Axios.get(`${URI}/user/${comment.user}`)
    //                 comment.user = user
    //                 return comment;
    //             })
    //         );
    //         return blog;
    //     })
    // )
    console.timeEnd("loading time: ")
}

const testGroup = async() => {
    await test()
    await test()
    await test()
    await test()
    await test()
    await test()
    await test()
    await test()
    await test()
    await test()
}

testGroup();