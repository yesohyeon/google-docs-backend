<h1 align="center">
    Google dogs
</h1>

<br/>
<br/>

<p align="center">
    <img src="https://img.shields.io/badge/Frontend-React-blue.svg" alt="Frontend-React">
    <img src="https://img.shields.io/badge/Database-Mongo-green.svg" alt="Database-Mongo">
    <img src="https://img.shields.io/badge/Backend-Node%20&%20Express-green.svg" alt="Backend-Node-Express">
    <img src="https://github.com/DenisOH/pyheroku-badge/raw/master/img/deployed.svg?sanitize=true" alt="Heroku">
    <a href="https://app.netlify.com/sites/coruscating-creponne-91f904/deploys" title="Netlify-deploy-status">
        <img src="https://api.netlify.com/api/v1/badges/dc73ec3b-0757-493d-9ec0-5dfce4a57810/deploy-status" alt="Netlify-deploy-status">
    </a>
</p>

<p align="center">
    <img style="width:230px"
 src="https://user-images.githubusercontent.com/93248242/193749246-86d8ca63-9c00-451c-9a52-bc61271ba18e.png" alt="Usepool-Logo">
</p>

<p align="center">
    MERN Stack과 socket.io를 이용한 문서작업용 실시간 협업 툴 web application
</p>

<br/>
<br/>

<img style="width:500px" src="https://user-images.githubusercontent.com/93248242/193782037-963bf91f-095f-4224-a371-c2b1e766b9a0.mp4" alt="google-dogs">

<br/>
<br/>

## Index

1. [기술 스택](#기술-스택)
2. [구현 사항](#구현-사항)
3. [UI 예시](#UI-예시)
4. [디렉토리 구조](#디렉토리-구조)
5. [데이터 구조](#데이터-구조)
6. [Demo](#Demo)
7. [사전 설치](#사전-설치)
8. [작업 방법](#작업-방법)
9. [도전했던 기술](#도전했던-기술)
10. [마무리하며...](#마무리하며)

<br/>
<br/>

## 기술 스택

Base  
`React`

Style  
`Styled-component`

Database  
`MongoDB`

Server  
`Node & Express & Socket.io`

Text-editor  
`Quill`

Version Management  
`Git`

<br/>
<br/>


## 구현 사항

Login page - /login
- 구글을 이용한 소셜 로그인(Firebase Auth)
- 로그인 하지 않은 사용자는 로그인 페이지 외 페이지 접근 불가

My documents page - /
- 본인이 생성한 문서 목록 확인(업데이트 순 정렬)
- 문서 목록 중 다른 사용자가 문서 수정시, 수정 진행 중 상태 표시
- 새 문서 만들기 버튼, 새 문서 편집 페이지로 이동

Document editor page - /documents/:documentId
- 가장 최근 문서 작업 내용 로드
- 문서 작업(텍스트 입력만 가능)
- 문서 저장, 삭제 버튼(문서 생성한 사람이 아닌 경우, 삭제 버튼 숨김)
- 매 20초마다 자동 저장
- Collaborative editing, 다른 접속자들의 문서 작업 커서 위치 표시
- 고유 URL 부여

<br/>
<br/>

## UI 예시

- My documents page - /

<img width="800" alt="image" src="https://user-images.githubusercontent.com/93248242/193756388-a8d82309-ed0c-4670-badf-3d895fbf286c.png">

- Document editor page - /documents/:documentId

<img width="800" alt="image" src="https://user-images.githubusercontent.com/93248242/193755707-d4cf9b08-07ec-4cc3-9731-088d4fa82521.png">

<br/>
<br/>

## 디렉토리 구조

- Frontend

```bash
├── App.js
├── api
│   └── axiosInstance.js
├── component
│   ├── DocumentCard.js
│   ├── NavBar.js
│   ├── TextEditor
│   │   ├── TextEditor.js
│   │   └── styles.css
│   └── spec
│       └── unit
│           └── DocumentCard.spec.js
├── config
│   └── firebase.js
├── constants
│   └── error.js
├── context
│   ├── AuthProvider.js
│   └── userContext.js
├── frontend.txt
├── hooks
│   └── useSocket.js
├── index.css
├── index.js
├── pages
│   ├── Document.js
│   ├── Login.js
│   └── MyDocuments.js
├── setupTests.js
└── utils
└── selectionChangeHandler.js
```

- Backend

```bash
.
├── app.js
├── backend.txt
├── bin
│   └── www.js
├── config
│   ├── connectMongoDB.js
│   ├── firebase.js
│   └── serviceAccountKey.json
├── constants
│   └── error.js
├── middlewares
│   ├── authenticate.js
│   ├── errorHandler.js
│   └── invalidUrlHandler.js
├── models
│   ├── Document.js
│   └── User.js
├── routes
│   ├── controllers
│   │   ├── documentController.js
│   │   └── loginController.js
│   ├── documentRouter.js
│   └── loginRouter.js
├── test
│   └── unit
│       ├── documentController.spec.js
│       └── rootController.spec.js
└── webSocket.js
```

<br/>
<br/>

## 데이터 구조

<img width="405" alt="image" src="https://user-images.githubusercontent.com/93248242/193759114-779cc8af-634a-4907-979c-6a50f4ebc294.png">

https://lucid.app/lucidchart/7a120ba7-2cc6-442d-a811-86fbe1790ca4/edit?viewport_loc=61%2C59%2C2219%2C1075%2C0_0&invitationId=inv_ed9386cc-5c55-43f1-b59d-47184b0b83b4#

<br/>
<br/>

## Demo

https://coruscating-creponne-91f904.netlify.app/login

<br/>
<br/>

## 사전 설치

Install dependencies

```sh
$ npm install
```

## 작업 방법

```sh
# Install the firebase SDK and replace the firebase configuration information with environment variables
# Visit http://firebase.google.com/firebase/console
```

```sh
$ npm start
# Visit http://localhost:3000 from your browser (Chrome)
```

<br/>
<br/>

## 도전했던 기술
React hooks
- useContext : page간 전역적 데이터 공유를 위해 useContext를 이용, 사용자의 로그인 상태 정보를 담아 모든 page component와 공유
- useSocket : 코드의 중복을 줄이고 재사용성을 높이기 위해 커스텀 훅 생성, backend url을 hook내에서 한 번에 관리할 수 있다는 점이 장점
- useEffect와 clean up function : 20초마다 자동 저장하는 기능을 구현하던 중, text editor component가 unmount또는 update된 이후에도 setInterval이 작동하여 메모리가 누수되는 것을 막기 위하여, clean up 함수 작성

## 마무리하며
- socket.io를 사용하면서, websocket과 socket.io의 room, adapter 등의 개념을 공부하게 되었는데, 이벤트를 기반하여 서버와 브라우저간에 양방향 통신이 가능하다는 점이 매우 흥미로웠다. 서버가 클라이언트에게 변경사항을 알릴 수 있는 방법이 필요한 기능을 구현할 때 사용하면 좋을 것 같다.
- My documents page에서 "문서 목록 중 다른 사용자가 문서 수정시, 수정 진행 중 상태 표시" 기능을 구현하기 위해서 조사를 했었을 때, Redis의 Pub/Sub 기능을 이용해서도 구현이 가능할 것 같아, 공부해보려고 한다.
