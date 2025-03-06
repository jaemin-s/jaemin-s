// import 생략

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // 해당 path로 라우트되었을 때 표시할 jsx, 중첩 구조에서 부모면 Layout형태로 구성
    errorElement: <ErrorPage />, // 에러시 보여줄 jsx, 자식에서 별도로 지정안하면 부모의 errorElement 보여줌
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);
