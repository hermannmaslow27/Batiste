"use client";

import { Plus } from "lucide-react";
import { Button, Card, CardBody, CardHeader, Field, Input } from "@/components/ui";
import { useNavigationActions } from "./useNavigationActions";
import NavItemRow from "./NavItemRow";
import type { NavbarConfig } from "@/actions/navigation";

interface AvailablePage {
  id: string;
  title: string;
  slug: string;
}

interface NavigationEditorProps {
  siteId: string;
  initialConfig?: NavbarConfig | null;
  pages: AvailablePage[];
}

export default function NavigationEditor({
  siteId,
  initialConfig,
  pages,
}: NavigationEditorProps) {
  const {
    items,
    ctaButton,
    setCtaButton,
    addItem,
    updateItem,
    removeItem,
    moveItem,
    save,
    reset,
    pending,
  } = useNavigationActions(siteId, initialConfig);

  const handleAddPageLink = (page: AvailablePage) => {
    addItem({
      label: page.title,
      url: page.slug ? `/${page.slug}` : "/",
      isExternal: false,
    });
  };

  const handleAddCustomLink = () => {
    addItem({
      label: "Nouveau lien",
      url: "/",
      isExternal: false,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader
          title="Liens du menu de navigation"
          description="Personnalisez les éléments affichés dans la barre de menu de votre site public."
        />
        <CardBody className="space-y-4">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500">
              Aucun lien personnalisé configuré. Vos pages publiées s'affichent automatiquement par défaut.
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item, index) => (
                <NavItemRow
                  key={item.id}
                  item={item}
                  index={index}
                  total={items.length}
                  onUpdate={updateItem}
                  onRemove={removeItem}
                  onMove={moveItem}
                />
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-100">
            <Button variant="outline" size="sm" onClick={handleAddCustomLink}>
              <Plus className="mr-1 size-3.5" />
              Lien personnalisé
            </Button>
            {pages.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleAddPageLink(p)}
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-100"
              >
                + {p.title}
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Bouton d'action (CTA) dans la Navbar"
          description="Affichez un bouton d'action mis en valeur dans le coin droit de votre navigation."
        />
        <CardBody className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={ctaButton?.enabled ?? false}
              onChange={(e) =>
                setCtaButton((prev) => ({ ...prev, enabled: e.target.checked }))
              }
              className="size-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
            />
            <span className="text-sm font-medium text-zinc-800">
              Activer un bouton d'action principal dans la navbar
            </span>
          </label>

          {ctaButton?.enabled && (
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <Field label="Texte du bouton">
                <Input
                  value={ctaButton.label}
                  onChange={(e) =>
                    setCtaButton((prev) => ({ ...prev, label: e.target.value }))
                  }
                  placeholder="ex: Réserver une table"
                />
              </Field>
              <Field label="Destination (URL ou #ancre)">
                <Input
                  value={ctaButton.url}
                  onChange={(e) =>
                    setCtaButton((prev) => ({ ...prev, url: e.target.value }))
                  }
                  placeholder="ex: #reservation ou /contact"
                />
              </Field>
            </div>
          )}
        </CardBody>
      </Card>

      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={reset} disabled={pending}>
          Réinitialiser par défaut
        </Button>
        <Button onClick={save} loading={pending}>
          {pending ? "Enregistrement…" : "Enregistrer la navigation"}
        </Button>
      </div>
    </div>
  );
}
