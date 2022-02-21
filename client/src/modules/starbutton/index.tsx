import Button from "@modules/button";
import Star from "@modules/icons/Star";
import { useStarPostMutation } from "@generated";

interface StarButtonProps {
  postId: string;
  stars: number;
}
export default function StarButtton({ postId, stars }: StarButtonProps) {
  const [_updateStarMutation, starMutation] = useStarPostMutation();

  return (
    <Button
      onClick={async () => {
        await starMutation({
          postId,
        });
      }}>
      <Star />
      <span>{_updateStarMutation.data?.starPost.stars || stars}</span>
    </Button>
  );
}
