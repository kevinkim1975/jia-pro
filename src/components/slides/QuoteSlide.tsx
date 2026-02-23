interface QuoteSlideProps {
  readonly message: string
  readonly subMessage?: string
}

export function QuoteSlide({ message, subMessage }: QuoteSlideProps) {
  const isShortMessage = message.length < 5

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        backgroundColor: "#004B8D",
        fontFamily: "Pretendard, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Background decoration — bottom-right subtle glow */}
      <div
        className="absolute w-64 h-64 rounded-full"
        style={{
          bottom: "-32px",
          right: "-32px",
          backgroundColor: "rgba(72, 169, 197, 0.05)",
          filter: "blur(48px)",
        }}
      />

      {/* Giant opening quote mark — top-left */}
      <span
        className="absolute select-none pointer-events-none"
        aria-hidden="true"
        style={{
          top: "-40px",
          left: "40px",
          fontSize: "380px",
          lineHeight: 1,
          color: "rgba(255, 255, 255, 0.06)",
          fontFamily: "Georgia, 'Times New Roman', serif",
          zIndex: 0,
        }}
      >
        {"\u201C"}
      </span>

      {/* Giant closing quote mark — bottom-right, rotated 180° */}
      <span
        className="absolute select-none pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: "-40px",
          right: "40px",
          fontSize: "380px",
          lineHeight: 1,
          color: "rgba(255, 255, 255, 0.06)",
          fontFamily: "Georgia, 'Times New Roman', serif",
          transform: "rotate(180deg)",
          zIndex: 0,
        }}
      >
        {"\u201C"}
      </span>

      {/* Content — centered between the two giant quote marks */}
      <div
        className="relative flex flex-col items-center justify-center w-full h-full px-16"
        style={{ zIndex: 1 }}
      >
        {/* Message */}
        <p
          className="text-center font-bold max-w-3xl"
          style={{
            color: "#FFFFFF",
            fontSize: isShortMessage ? "96px" : "42px",
            lineHeight: isShortMessage ? 1.1 : 1.35,
            whiteSpace: "pre-line",
          }}
        >
          {message}
        </p>

        {/* SubMessage section */}
        {subMessage && (
          <>
            {/* Accent line */}
            <div
              className="ml-auto mt-8 mb-5"
              style={{
                width: "96px",
                height: "2px",
                backgroundColor: "rgba(72, 169, 197, 0.4)",
                maxWidth: "768px",
                marginLeft: "auto",
                marginRight: "calc(50% - 384px + 0px)",
              }}
            />

            {/* SubMessage with em dash */}
            <div className="w-full max-w-3xl">
              <p
                className="text-right font-light"
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "18px",
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                }}
              >
                {"— "}
                {subMessage}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
