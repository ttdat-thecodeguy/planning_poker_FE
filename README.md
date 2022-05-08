# PlanningPoker
(Poker tools)[https://planningpokeronline.com/SrmZnFvzslU1WKq8fGIA]
This project about Planning Poker using in agile
Use some tools: angular

> New advanced rule > Đã xử lí
TRƯỜNG HỢP 001: trường hợp 2 user đang chơi, có 1 user thứ 3 xuất hiện
	> lưu tiến trình của bảng (GameJoins)
	> lưu issue đang được voting (issueActive)

		> flow: userIn > send add-user message (MessageType : JOIN) > server gửi thông tin bàn game + issueActive > user subscribe thông tin > user build lại bảng   


 > NEW advance RULE > chưa xử lí > cần note
 TRƯỜNG HỢP 002:  THE OWNER OF TABLE trống (the owner đã rời khỏi bàn)
 -> quyền show cards / releval card sẽ được set về "everyone" bằng bất cứ lí do nào


> Alternative > advanced rule > chưa xử lí
	> khi toàn bộ user rời khỏi bàn > xóa bảng sau 30''
