# React - To Do List (Challenge)

### Vite + React + TypeScript로 할 일 목록(To-Do) 웹 사이트를 만듭니다. (Challenge)

<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Styled&dash;Components-DB7093?style=flat-square&logo=styledcomponents&logoColor=white"/>  
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=recoil&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil Persist-3578E5?style=flat-square&logoColor=white"/>

---

- **23-11-27 : #6.5 / Set up (+ Code Challenge(3 days)[1st day])**
- **23-11-28 : #6.6 ~ #6.15 / React-Hook-Form + Recoil (+ Code Challenge(3 days)[2nd day])**
  - <a href="https://www.react-hook-form.com/get-started" target="_blank">React-Hook-Form 패키지</a>
    - React에서 form을 다루기 위한 강력하고 유연한 패키지
      - form 상태를 관리하고 유효성 검사, 에러 처리, 제어된 컴포넌트 등의 기능 제공
    - 설치법 : `npm i react-hook-form`
  - useFrom()
    - form 상태를 초기화하고 제어하는 데 사용하는 hook (React-Hook-Form)
    - 선언 기본형 : `const { 프로퍼티들 } = useForm<제네릭>();`
      - 프로퍼티들
        - register : [필수] form의 input 요소를 등록하는 메서드
          - onChange, onBlur, ref 등을 포함하고 있음
          - onBlur : &lt;input&gt;의 바깥쪽을 클릭했을 때의 이벤트 (onClick의 반대)
        - watch : form의 입력값들의 변화를 실시간으로 관찰하는 메서드
        - handleSubmit : [필수] form 제출 시 실행하는 함수(onSubmit)이며, 검증을 담당함
        - formState : form의 현재 상태를 나타내는 객체로, error의 정보를 포함
          - formState.errors : error의 유무 뿐만아니라, 어떤 종류의 에러인지 알려줌
        - setValue : 특정 필드의 값을 동적으로 설정하는 메서드
          - 사용법 : `setValue(이름, 값);`
        - reset : form을 초기화하고, 모든 입력 필드를 기본값으로 reset하느 메서드
          - 사용법
            - 모든 form 초기화 : `reset();`
            - 특정 필드 초기화 : `reset({ 이름: 바꿀값 });`
      - defaultValues : 초기값을 줄 수 있음
        - 사용법 : `useForm({ defaultValues: { 키-값 } });`
    - 사용 기본형 : `<input {...register(이름, { 옵션 })} />`
      - 옵션으로 검증 옵션을 사용함 (HTML이 아니라 JS에서 검증)
        - 기본형 : `옵션명: 검증값`
        - 검증 error 시 나타나는 메시지를 직접 설정 가능함
          - 기본형 : `옵션명: { value: 값, message: 메시지 }`
        - <a href="https://www.react-hook-form.com/api/useform/register/" target="_blank">검증 옵션들</a>
      - 유효하지 않은 데이터를 제출 시 자동으로 해당 input으로 focus해줌
    - ex.
      ```
      <input
        {...register("password", {
          required: true,
          minLength: {
            value: 5,
            message: "Your password is too short.",
          },
        })}
        type="password"
        placeholder="Password"
      />
      ```
  - form에서의 정규식 (Regular Expression)
    - 사용법 : 'register'의 옵션으로 'pattern'을 사용
    - ex.
      ```
      <input
        {...register("email", {
          required: true,
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
            message: "Only naver.com emails allowed",
          },
        })}
        type="email"
        placeholder="Email"
      />
      ```
    - <a href="https://regex101.com/" target="_blank">정규식 테스트 사이트</a>
  - 사용자에게 form의 에러를 보여주는 방법
    - 'useForm()'의 'formState.errors'프로퍼티를 사용해 사용자에게 보여줌
    - 'formState.errors.이름.type'으로 에러 타입을 확인이 가능하나, 타입에 신경쓰지 않고 'formState.errors.이름.message' 값만 확인해 보여주면 됨
    - 사용법 : `formState.errors.이름.message`
  - form 제출 시 검증
    - form 제출 시 'handleSubmit'을 사용해 내용을 검증 후 제출할 수 있음
    - 설정법
      ```
      const { handleSubmit } = useForm<제네릭>();
      const 검증함수명 = (데이터: 제네릭) => 검증함수내용;
      <form onSubmit={handleSubmit(데이터유효시호출함수, ?데이터무효시호출함수)}>
      ```
    - <a href="https://www.react-hook-form.com/api/useform/seterror/" target="_blank">수동으로 에러 설정법</a>
      - 사용법
        ```
        const { setError } = useForm<제네릭>();
        setError(이름, { 에러 옵션 }, ?{ shouldFocus: 불리언값 });
        ```
        - setError : 특정 form 필드에 대한 유효성 검사 에러를 수동으로 설정하는 데 사용
        - 에러옵션에서 'message' 프로퍼티를 사용해 에러 메시지를 보낼 수 있음
        - shouldFocus : [Boolean] 해당 필드에 커서를 focus할 지의 여부
      - ex.
        ```
        const onValid = (data: IForm) => {
          if (data.password !== data.password1)
            setError(
              "password1",
              { message: "Password are not the same." },
              { shouldFocus: true }
            );
        };
        ```
    - form 요소 이외의 추가적인 에러 생성 시 제네릭에서 옵션변수를 생성해 사용할 것
  - <a href="https://www.react-hook-form.com/api/useform/register/" target="_blank">&lt;input&gt;에서의 검증함수</a>
    - 'register'의 옵션으로 함수를 사용해 값을 검증할 수 있음
    - 기본형 : `<input {...register(이름, {validate: 검증함수 })} />`
      - 검증함수 : (value, ?formValues) => Boolean값(또는 에러메시지)
      - 여러 개의 검증함수 사용가능
        - 기본형
          ```
          validate: {
            함수명: (인자) => 반환값,
            ...
          }
          ```
      - async 비동기 함수를 사용해 서버에 확인 후 응답을 받을 수도 있음
  - 배열값을 가지는 atom에 대해 배열 요소를 추가하는 방법 [Recoil]
    - 아톰수정함수(useSetRecoilState)에서 return문으로 사용해야 함
      - '배열.push()'같은 mutate 메서드들 사용 불가
    - '[...배열]'을 이용해 새로운 배열을 사용해야 함
    - 기본형 : `아톰수정함수(이전값 => [...이전값, 새로운값]);`
    - ex. _&lt;form&gt; 제출 시 실행되는 함수를 커스텀_
      ```
      const handleValid = ({ toDo }: IForm) => {
        setToDos((oldToDos) => [
          ...oldToDos,
          { text: toDo, id: Date.now(), category: "TO_DO" },
        ]);
        reset();
      };
      ```
  - 객체값을 가지는 배열에서 특정 요소의 객체값을 수정하는 방법 [Recoil]
    - '{ text, id, category }'값을 가지는 배열을 예시로 설명할 것
    1. 'id'값을 사용해 특정 요소를 찾기
       - 해당 요소의 index만 알면 됨 (값 자체를 알 필요가 없음)
       - 기본형 : `const 변수명 = 배열.findIndex(판별함수);`
         - 배열.findIndex(판별함수) : 주어진 판별함수를 만족하는 첫 번째 요소의 index를 반환하는 메서드
           - 만족하는 요소가 없다면 '-1'을 반환
       - ex. `const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);`
    2. 특정 요소의 값을 수정하기
       - 해당 요소의 index가 바뀌지 않으면서, 값만 수정해야 함 (replace)
       - '앞배열 + 변경요소 + 뒷배열'을 반환하여, 순서를 유지시킴
         - '배열.slice()'와 '[...배열]'을 이용
         - return [...앞배열, 변경요소, ...뒷배열]
       - ex.
         ```
         const newToDo = { text, id, category: newCategory };
         return [
           ...oldToDos.slice(0, targetIdx),
           newToDo,
           ...oldToDos.slice(targetIdx + 1),
         ];
         ```
    - 전체적인 ex.
      ```
      const onClick = (newCategory: IToDo["category"]) => {
        setToDos((oldToDos) => {
          const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
          const newToDo = { text, id, category: newCategory };
          return [
            ...oldToDos.slice(0, targetIdx),
            newToDo,
            ...oldToDos.slice(targetIdx + 1),
          ];
        });
      };
      <li>
        {category !== "TO_DO" && (
          <button onClick={() => onClick("TO_DO")}>To-Do</button>
        )}
      </li>
      ```
- **23-11-29 : #6.16 ~ #6.19 + #7.0 ~ #7.1 / Recoil Selector + Deploy (+ Code Challenge(3 days)[3rd day])**
  - _Update_
    - _To-Do 삭제 기능_
    - _커스텀 Category 추가 / 변경 / 삭제 기능_
    - _localStorage 저장 기능_
  - selector (Recoil)
    - atom의 상태를 변환하거나 계산하여, 새로운 값으로 return하는 함수
      - atom의 state는 변환시키지 않고, output을 변형시키는 도구
    - 선언 기본형
      ```
      const 변수명 = selector({
        key: 이름,
        get: ({ get }) => 함수내용,
        ?set: ({ set, ?get }, newValue) => 함수내용
      });
      ```
      - get 함수 : [ReadOnly] 다른 atom이나 selector를 기반으로 값을 계산함
        - return하는 값이 해당 selector의 value가 됨
        - get 인자 : 다른 atom이나 selector를 가져오는 메서드
          - 사용법 : `const 변수명 = get(아톰명);`
          - get으로 보고있는 아톰의 state가 바뀌면, selector의 값도 바뀜
        - 'useRecoilValue'를 사용해 selector를 가져와 사용할 수 있음
      - set 함수 : [Write] 해당 selector로부터 파생된 state를 업데이트하기 위해 사용
        - set 인자 : 다른 atom이나 selector의 값을 쓰는 메서드
        - newValue = 업데이트하려는 state의 새 값
        - 사용법 : `set(아톰명, newValue);`
        - selector의 setter함수(useSetRecoilState)를 통해 state를 수정함
    - ex. 하나의 atom으로 minutes ↔️ hours 변환기
      ```
      const hourSelector = selector({
        key: "hours",
        get: ({ get }) => {
          const minutes = get(minuteState);
          return minutes / 60;
        },
        set: ({ set }, newValue) => {
          const minutes = Number(newValue) * 60;
          set(minutesState, minutes);
        }
      });
      ```
  - enum
    - 열거형 타입 선언법
      - 각 멤버는 기본적으로 숫자 값이 할당됨 (0에서 시작하며, 1씩 증가)
        - 직접적으로 값(숫자 또는 문자열)을 줄 수도 있음
      - 열거형은 특정 값 집합 중 하나를 선택하는데 도움을 줌
    - 선언법 : `const enum 변수명 { 멤버1, 멤버2, ... }`
      - 주로 변수명의 첫 글자는 대문자를 사용
      - 주로 문자열값 멤버명은 대문자로 사용
      - enum을 일반적인 상태로 컴파일 시 코드스페이스를 오염시키므로, 'const enum' 형태로 사용
    - 사용법 : `enum변수명.멤버`
      - 프로퍼티처럼 사용하므로 실수를 방지할 수 있음
      - ex.
        ```
        const categoryState = atom({
          key: "category",
          default: Categories.TO_DO,
        });
        ```
  - <a href="https://www.npmjs.com/package/recoil-persist" target="_blank">recoil-persist 패키지</a>
    - Recoil 상태를 지속적으로 저장하고 복원하기 위해 사용되는 패키지
      - localStorage나 다른 저장매체에 저장하여, 상태를 유지할 수 있음
    - 설치법 : `npm i recoil-persist`
    - 설정법 : `const { persistAtom } = recoilPersist({ ?옵션 });`
      - 옵션
        - key : localStorage에 데이터 저장 시 사용되는 key명
          - 기본값 : "recoil-persist"
        - storage : 데이터를 저장할 저장소 설정
          - 기본값 : localStorage
        - converter : 저장소에서 값을 직렬화/역직렬화하는 방법을 구성
          - 기본값: JSON
    - 사용법 : 사용하고자하는 atom에 `effects_UNSTABLE: [persistAtom]` 키-값을 추가
    - 설정만 해놓으면 localStorage에 저장(set)과 불러오기(get)를 자동으로 실행함

---

노마드 코더 정책 상 강의요약은 괜찮으나, 코드와 필기는 공개적인 곳에 올리면 안 됨.
필기 요약지는 암호화된 .zip 파일로 저장함.
