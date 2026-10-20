import Image from "next/image";

export function PhoneShowcase({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="flex flex-col gap-3">
      <div className="bg-muted overflow-hidden rounded-lg border">
        <Image
          src={src}
          alt={alt}
          width={864}
          height={864}
          unoptimized
          priority={src === "/demo.gif"}
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="text-muted-foreground text-center text-xs">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
