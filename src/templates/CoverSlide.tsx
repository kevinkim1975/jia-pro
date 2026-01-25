import { background, text } from '../tokens/colors'
import { fontSize, fontFamily } from '../tokens/typography'

interface CoverSlideProps {
  clinicName: string
  proposalTitle: string
  subtitle?: string
  date?: string
}

type ShapeType = 'circle' | 'triangle' | 'plus' | 'ring'

interface Shape {
  type: ShapeType
  size: number
  x: number
  y: number
  opacity: number
  delay: number
}

const shapes: Shape[] = [
  { type: 'circle', size: 120, x: 5, y: 10, opacity: 0.4, delay: 0 },
  { type: 'triangle', size: 80, x: 15, y: 70, opacity: 0.35, delay: 0.5 },
  { type: 'plus', size: 60, x: 25, y: 25, opacity: 0.3, delay: 1 },
  { type: 'ring', size: 100, x: 8, y: 85, opacity: 0.45, delay: 1.5 },
  { type: 'circle', size: 60, x: 35, y: 5, opacity: 0.35, delay: 0.3 },
  { type: 'triangle', size: 100, x: 45, y: 80, opacity: 0.4, delay: 0.8 },
  { type: 'plus', size: 80, x: 55, y: 15, opacity: 0.35, delay: 1.2 },
  { type: 'ring', size: 70, x: 65, y: 90, opacity: 0.3, delay: 0.6 },
  { type: 'circle', size: 90, x: 75, y: 8, opacity: 0.4, delay: 1.8 },
  { type: 'triangle', size: 70, x: 85, y: 75, opacity: 0.35, delay: 0.2 },
  { type: 'plus', size: 50, x: 92, y: 20, opacity: 0.3, delay: 1.4 },
  { type: 'ring', size: 110, x: 88, y: 60, opacity: 0.45, delay: 0.9 },
  { type: 'circle', size: 50, x: 20, y: 50, opacity: 0.3, delay: 2 },
  { type: 'triangle', size: 60, x: 40, y: 45, opacity: 0.35, delay: 1.1 },
  { type: 'plus', size: 70, x: 60, y: 55, opacity: 0.4, delay: 0.4 },
  { type: 'ring', size: 80, x: 78, y: 40, opacity: 0.35, delay: 1.6 },
  { type: 'circle', size: 70, x: 3, y: 45, opacity: 0.35, delay: 0.7 },
  { type: 'triangle', size: 55, x: 95, y: 35, opacity: 0.3, delay: 1.3 },
  { type: 'plus', size: 45, x: 12, y: 30, opacity: 0.35, delay: 1.9 },
  { type: 'ring', size: 65, x: 50, y: 92, opacity: 0.4, delay: 0.1 },
  { type: 'circle', size: 85, x: 30, y: 88, opacity: 0.4, delay: 1.7 },
  { type: 'triangle', size: 75, x: 70, y: 3, opacity: 0.35, delay: 2.2 },
  { type: 'plus', size: 55, x: 82, y: 85, opacity: 0.3, delay: 0.5 },
  { type: 'ring', size: 95, x: 18, y: 95, opacity: 0.45, delay: 1 },
  { type: 'circle', size: 40, x: 58, y: 30, opacity: 0.3, delay: 2.5 },
  { type: 'triangle', size: 65, x: 48, y: 60, opacity: 0.35, delay: 1.5 },
]

const ShapeComponent = ({ shape }: { shape: Shape }) => {
  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${shape.x}%`,
    top: `${shape.y}%`,
    animation: `float 3s ease-in-out infinite`,
    animationDelay: `${shape.delay}s`,
  }

  const color = background.accent

  switch (shape.type) {
    case 'circle':
      return (
        <div
          style={{
            ...baseStyle,
            width: shape.size,
            height: shape.size,
            borderRadius: '50%',
            backgroundColor: color,
            opacity: shape.opacity,
          }}
        />
      )
    case 'triangle':
      return (
        <div
          style={{
            ...baseStyle,
            width: 0,
            height: 0,
            borderLeft: `${shape.size / 2}px solid transparent`,
            borderRight: `${shape.size / 2}px solid transparent`,
            borderBottom: `${shape.size}px solid ${color}`,
            opacity: shape.opacity,
            backgroundColor: 'transparent',
          }}
        />
      )
    case 'plus':
      return (
        <div
          style={{
            ...baseStyle,
            width: shape.size,
            height: shape.size,
            opacity: shape.opacity,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '10%',
              width: shape.size * 0.2,
              height: shape.size * 0.8,
              backgroundColor: color,
              transform: 'translateX(-50%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '10%',
              width: shape.size * 0.8,
              height: shape.size * 0.2,
              backgroundColor: color,
              transform: 'translateY(-50%)',
            }}
          />
        </div>
      )
    case 'ring':
      return (
        <div
          style={{
            ...baseStyle,
            width: shape.size,
            height: shape.size,
            borderRadius: '50%',
            border: `${shape.size * 0.1}px solid ${color}`,
            opacity: shape.opacity,
            backgroundColor: 'transparent',
          }}
        />
      )
  }
}

export default function CoverSlide({
  clinicName,
  proposalTitle,
  subtitle,
  date,
}: CoverSlideProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: background.warm,
        fontFamily: fontFamily.sans,
        overflow: 'hidden',
      }}
    >
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>

      {shapes.map((shape, index) => (
        <ShapeComponent key={index} shape={shape} />
      ))}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          padding: 80,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: fontSize['title-xl'].size,
            fontWeight: fontSize['title-xl'].weight,
            lineHeight: fontSize['title-xl'].lineHeight,
            letterSpacing: fontSize['title-xl'].letterSpacing,
            color: text.primary,
            margin: 0,
            marginBottom: 24,
          }}
        >
          {clinicName}
        </h1>

        <h2
          style={{
            fontSize: fontSize['title-lg'].size,
            fontWeight: fontSize['title-lg'].weight,
            lineHeight: fontSize['title-lg'].lineHeight,
            letterSpacing: fontSize['title-lg'].letterSpacing,
            color: text.primary,
            margin: 0,
            marginBottom: subtitle ? 16 : 40,
          }}
        >
          {proposalTitle}
        </h2>

        {subtitle && (
          <p
            style={{
              fontSize: fontSize['title-md'].size,
              fontWeight: fontSize['title-md'].weight,
              lineHeight: fontSize['title-md'].lineHeight,
              letterSpacing: fontSize['title-md'].letterSpacing,
              color: text.secondary,
              margin: 0,
              marginBottom: 40,
            }}
          >
            {subtitle}
          </p>
        )}

        {date && (
          <p
            style={{
              fontSize: fontSize['title-md'].size,
              fontWeight: fontSize['title-md'].weight,
              lineHeight: fontSize['title-md'].lineHeight,
              letterSpacing: fontSize['title-md'].letterSpacing,
              color: text.secondary,
              margin: 0,
            }}
          >
            {date}
          </p>
        )}
      </div>
    </div>
  )
}
