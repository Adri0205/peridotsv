export default function UserAvatar({ user, size = "md" }) {
  const getInitials = (name) => {
    if (!name) return "U";

    const names = name.trim().split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    // Primera letra del primer nombre y primera letra del apellido
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const getColorFromName = (name) => {
    if (!name) return "bg-emerald-600";

    // Generar un color basado en el nombre
    const colors = [
      "bg-emerald-600",
      "bg-blue-600",
      "bg-purple-600",
      "bg-pink-600",
      "bg-indigo-600",
      "bg-teal-600",
      "bg-cyan-600",
      "bg-violet-600",
    ];

    // Usar el código del primer carácter para seleccionar un color
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  if (user.image) {
    return (
      <img
        src={user.image}
        alt={user.name || "Usuario"}
        className={`${sizeClasses[size]} rounded-full border-2 border-emerald-200 object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} ${getColorFromName(
        user.name
      )} rounded-full border-2 border-emerald-200 flex items-center justify-center text-white font-semibold`}
    >
      {getInitials(user.name || user.email)}
    </div>
  );
}
