import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { User, MessageSquare } from "lucide-react";

interface Comment {
  commentID: number;
  commentText: string;
  commentDate: string;
  authorName: string;
  userIntID: number;
}

interface CommentSectionProps {
  apiEndpoint: string;
  itemId: number | string;
}

const CommentSection = ({ apiEndpoint, itemId }: CommentSectionProps) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [itemId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`http://localhost:5092/api/${apiEndpoint}/${itemId}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Lỗi khi tải bình luận:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Vui lòng đăng nhập để bình luận");
      return;
    }
    if (!newComment.trim()) {
      toast.error("Vui lòng nhập nội dung bình luận");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5092/api/${apiEndpoint}/${itemId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userIntID: user.userIntId,
          commentText: newComment.trim(),
        }),
      });

      if (res.ok) {
        toast.success("Đã đăng bình luận!");
        setNewComment("");
        fetchComments(); // Reload comments
      } else {
        toast.error("Có lỗi xảy ra khi đăng bình luận");
      }
    } catch (error) {
      console.error("Lỗi khi đăng bình luận:", error);
      toast.error("Không thể đăng bình luận lúc này");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-primary" />
        Bình luận ({comments.length})
      </h3>

      {/* Input area */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-10 bg-secondary/30 p-6 rounded-xl border border-border">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Chia sẻ cảm nghĩ của bạn..."
                className="w-full bg-background border border-border rounded-lg p-4 font-body text-sm min-h-[100px] focus:outline-none focus:border-primary transition-colors"
              />
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={loading || !newComment.trim()}
                  className="btn-primary text-sm disabled:opacity-50"
                >
                  {loading ? "Đang đăng..." : "Đăng bình luận"}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-10 bg-secondary/30 p-6 rounded-xl border border-border text-center">
          <p className="font-body text-muted-foreground mb-4">Bạn cần đăng nhập để tham gia bình luận.</p>
          <a href="/login" className="btn-primary text-sm inline-block">Đăng nhập ngay</a>
        </div>
      )}

      {/* Comment List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.commentID} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold shrink-0">
                {comment.authorName ? comment.authorName.charAt(0).toUpperCase() : <User size={18} />}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-display font-bold">{comment.authorName}</span>
                  <span className="font-body text-xs text-muted-foreground">
                    {new Date(comment.commentDate).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>
                <p className="font-body text-foreground/90 whitespace-pre-wrap">{comment.commentText}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8 italic font-body">
            Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ cảm nghĩ!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
