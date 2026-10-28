"""Generate a schematic motion preview; no application code is changed."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import math

OUT = Path(__file__).parent / 'portfolio-motion-sketch.gif'
W, H = 960, 680
def font(size):
    return ImageFont.truetype('C:/Windows/Fonts/arial.ttf', size)
def ease(x):
    x = max(0, min(1, x))
    return x*x*(3-2*x)
frames = []
for i in range(120):
    t = i/10
    dark = t >= 9.5
    bg = '#202928' if dark else '#eeeae2'
    ink = '#eeeae2' if dark else '#202928'
    accent = '#a4c7be' if dark else '#315b5b'
    panel = '#303e3c' if dark else '#dedfd7'
    im = Image.new('RGB', (W,H), bg)
    d = ImageDraw.Draw(im)
    def text(x,y,s,size=20,c=None):
        d.text((x,y),s,font=font(size),fill=c or ink)
    def box(x,y,w,h,fill):
        d.rounded_rectangle((x,y,x+w,y+h),radius=5,fill=fill)
    text(38,20,'OJ.',28)
    text(600,26,'Work     Notes     Explore +',18)
    text(879,26,'Light' if dark else 'Dark',16)
    d.line((38,65,922,65),fill=accent,width=1)
    d.line((38,65,38+int(884*min(t/9,1)),65),fill=accent,width=4)
    if t < 3.5:
        shift=int(460*ease((t-1.7)/1.8))
        text(55,130-shift,'Omkar Jawalikar / Software engineer',18,accent)
        text(55,190-shift,'Thoughtful systems.',49)
        text(55,250-shift,'A curious mind.',49)
        text(55,335-shift,'Backend systems and AI applications.',21)
        text(55,405-shift,'Explore my work  ↓',22,accent)
        # Original abstract line sketch, not a product rendering.
        pts=[]
        for j in range(180):
            a=j/179*math.pi*3
            pts.append((760+85*math.sin(a),290-shift+90*math.cos(a/1.5)))
        d.line(pts,fill=accent,width=12)
        y=615-shift
        text(55,y,'01 / SELECTED WORK',20,accent)
        text(55,y+48,'Saathi',40)
        caption='01  ARRIVE — an introduction, then a hint of what follows'
        if t>1.7: caption='02  SCROLL — the next chapter enters naturally'
    else:
        text(45,100,'01 / WORK',18,accent)
        text(45,160,'● Saathi',20,accent)
        text(45,202,'○ AtlasPay',20)
        box(235,100,675,240,panel)
        text(260,120,'SAATHI / CONCEPTUAL INTERFACE',16,accent)
        box(260,162,130,150,bg)
        for j,s in enumerate(['Workspace','Projects','Activity']): text(275,180+j*36,s,15)
        for j in range(3):
            box(410+j*157,162,140,150,bg)
            text(424+j*157,181,['To do','In progress','Done'][j],16)
            d.line((425+j*157,226,526+j*157,226),fill=accent,width=3)
        text(235,363,'Shared work, reliably in sync.',34)
        text(235,414,'Reconnect. Replay. Reconcile.',20)
        text(235,454,'Inside the engineering  '+('−' if t>5.2 else '+'),21,accent)
        if t>5.2:
            h=int(105*ease((t-5.2)/.6))
            box(235,490,675,h,panel)
            if h>80:
                text(255,508,'Problem → Decision → Evidence',20,accent)
                text(255,545,'Details open inline; your reading position stays clear.',18)
        caption='03  DISCOVER — the project index stays beside the story'
        if t>5.2: caption='04  EXPAND — click a project to read its engineering decisions'
    if 7.3<t<9.5:
        p=ease((t-7.3)/.45)
        x=int(W-(W-300)*p)
        d.rectangle((x,66,W,625),fill='#202928')
        text(x+40,98,'JUMP TO A CHAPTER',16,'#a4c7be')
        text(x+500,98,'Close ×',17,'#eeeae2')
        for j,s in enumerate(['01  Work','02  Experience','03  Writing','04  Personal','05  Contact']):
            text(x+40,159+j*77,s,34,'#a4c7be' if j==0 else '#eeeae2')
        caption='05  EXPLORE — a section shortcut, without interrupting the journey'
    if dark: caption='06  SWITCH THEME — same section, same reading position'
    d.rectangle((0,625,W,H),fill='#315b5b')
    text(26,638,caption,18,'#ffffff')
    text(26,663,'SCHEMATIC MOTION STUDY • scroll and click actions are simulated',11,'#ffffff')
    frames.append(im)
frames[0].save(OUT,save_all=True,append_images=frames[1:],duration=100,loop=0,optimize=True)
print(OUT)
