#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//Solid Border Rectangle
vec3 solid_rect(vec2 st,vec2 pos,float width,float height,vec3 color){
    vec3 pct=vec3(0.0);

    float l=step(pos.x,st.x);
    float r=step(pos.x+width,st.x);
    float b=step(pos.y,st.y);
    float t=step(pos.y+height,st.y);
    vec3 rect=vec3((l-r)*(b-t));

    pct=rect*color;
    return pct;
}

vec3 solid_rect(vec2 st,vec2 pos,float width,float height,float border_width,vec3 color,vec3 border_color){
    vec3 pct=vec3(0.0);

    float l=step(pos.x,st.x);
    float r=step(pos.x+width,st.x);
    float b=step(pos.y,st.y);
    float t=step(pos.y+height,st.y);
    vec3 rect=vec3((l-r)*(b-t));

    l=step(pos.x-border_width,st.x);
    r=step(pos.x+width+border_width,st.x);
    b=step(pos.y-border_width,st.y);
    t=step(pos.y+height+border_width,st.y);
    vec3 border=vec3((l-r)*(b-t))-rect;

    pct=(border*border_color)+(rect*color);
    return pct;
}

//Blurred Border Rectangle
vec3 blurred_rect(vec2 st,vec2 pos,float blur_factor,vec3 color){
    float l=smoothstep(blur_factor,pos.x,st.x);
    float r=smoothstep(blur_factor,pos.x,1.-st.x);
    float b=smoothstep(blur_factor,pos.y,st.y);
    float t=smoothstep(blur_factor,pos.y,1.-st.y);
    return vec3(l*r*b*t)*color;
}

//Rectangular Outline
vec3 outline_rect(vec2 st,vec2 pos,float width,float height,float border_width,vec3 color){
    vec3 pct=vec3(0.);
    pct=solid_rect(st,pos,width,height,color);
    pct-=solid_rect(st,pos+(border_width/2.),width-border_width,height-border_width,color);
    return pct;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;

    vec3 color=vec3(0.0);

    // color=solid_rect(st,vec2(0.1,0.1),0.2,0.2,vec3(1.,0.,0.));
    color=solid_rect(st,vec2(0.1,0.1),0.2,0.2,0.05,vec3(1.,0.,0.),vec3(0.,0.,1.));
    // color=blurred_rect(st,vec2(0.1,0.1),0.,vec3(0.,1.,0.));
    // color=outline_rect(st,vec2(0.1,0.1),0.2,0.2,0.05,vec3(.5,0.,1.));

    gl_FragColor=vec4(color,1.0);
}